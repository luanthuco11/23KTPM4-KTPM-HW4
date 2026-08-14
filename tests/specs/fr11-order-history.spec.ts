import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { OrderHistoryPage } from '../pages/order-history.page';
import {
  createOrder,
  createTestUser,
  getMyOrders,
  loginAsAdmin,
  setOrderStatus,
} from '../support/eshop-api';

type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'canceled';

type OrderHistoryCase = {
  id: string;
  title: string;
  type:
    | 'multiple-orders'
    | 'empty-state'
    | 'unauthenticated'
    | 'data-isolation'
    | 'status-display'
    | 'currency-format'
    | 'required-columns'
    | 'single-order'
    | 'amount-boundary';
  orderCount?: number;
  userAOrders?: number;
  userBOrders?: number;
  status?: OrderStatus;
  expectedLabel?: string;
  expectedStyle?: string;
  totalAmount?: number;
  expectedAmount?: string;
};

const dataPath = path.resolve(process.cwd(), 'tests/data/order-history.json');
const orderHistoryCases = JSON.parse(
  readFileSync(dataPath, 'utf8'),
) as OrderHistoryCase[];

test.describe('FR-11 — Xem lịch sử đơn hàng', () => {
  for (const [index, testCase] of orderHistoryCases.entries()) {
    test(`${testCase.id} — ${testCase.title}`, async ({ page, request }, testInfo) => {
      const uniqueValue = `${testInfo.project.name}-${Date.now()}-${testInfo.workerIndex}-${index}`;
      const orderHistoryPage = new OrderHistoryPage(page);

      if (testCase.type === 'unauthenticated') {
        await orderHistoryPage.gotoUnauthenticated();
        await expect(orderHistoryPage.loginRequiredMessage).toBeVisible();
        await expect(orderHistoryPage.table).toHaveCount(0);
        return;
      }

      if (testCase.type === 'data-isolation') {
        const userA = await createTestUser(request, `${uniqueValue}-a`);
        const userB = await createTestUser(request, `${uniqueValue}-b`);
        for (let i = 0; i < (testCase.userAOrders ?? 0); i += 1) {
          await createOrder(request, userA.token, 100_000 + i);
        }
        for (let i = 0; i < (testCase.userBOrders ?? 0); i += 1) {
          await createOrder(request, userB.token, 200_000 + i);
        }

        const userAOrders = await getMyOrders(request, userA.token);
        expect(userAOrders).toHaveLength(testCase.userAOrders ?? 0);
        expect(userAOrders.every((order: { user_id: number }) => order.user_id === userA.id)).toBe(true);
        return;
      }

      const user = await createTestUser(request, uniqueValue);
      if (testCase.type === 'multiple-orders') {
        for (let i = 0; i < (testCase.orderCount ?? 0); i += 1) {
          await createOrder(request, user.token, 300_000 + i * 100_000);
        }
      }

      let targetOrderId: number | undefined;
      if (testCase.type === 'status-display') {
        targetOrderId = await createOrder(request, user.token, 500_000);
        const adminToken = await loginAsAdmin(request);
        await setOrderStatus(
          request,
          adminToken,
          targetOrderId,
          testCase.status ?? 'pending',
        );
      }

      if (testCase.type === 'currency-format') {
        targetOrderId = await createOrder(
          request,
          user.token,
          testCase.totalAmount ?? 0,
        );
      }

      if (
        testCase.type === 'required-columns' ||
        testCase.type === 'single-order' ||
        testCase.type === 'amount-boundary'
      ) {
        targetOrderId = await createOrder(
          request,
          user.token,
          testCase.totalAmount ?? 500_000,
        );
      }

      await orderHistoryPage.gotoAuthenticated(user.token);

      if (testCase.type === 'empty-state') {
        await expect(orderHistoryPage.emptyState).toBeVisible();
        await expect(orderHistoryPage.table).toHaveCount(0);
        return;
      }

      if (testCase.type === 'status-display') {
        const row = orderHistoryPage.rowByOrderId(targetOrderId!);
        const statusBadge = row.locator('td').nth(3).locator('span');
        await expect(statusBadge).toHaveText(testCase.expectedLabel!);
        await expect(statusBadge).toHaveClass(
          new RegExp(`(?:^|\\s)${testCase.expectedStyle}(?:\\s|$)`),
        );
        return;
      }

      if (testCase.type === 'currency-format') {
        const row = orderHistoryPage.rowByOrderId(targetOrderId!);
        await expect(row.locator('td').nth(2)).toHaveText(
          testCase.expectedAmount!,
        );
        return;
      }

      if (testCase.type === 'required-columns') {
        for (const columnName of [
          'Mã ĐH',
          'Ngày đặt',
          'Tổng tiền',
          'Trạng thái',
        ]) {
          await expect(
            orderHistoryPage.table.getByRole('columnheader', {
              name: columnName,
              exact: true,
            }),
          ).toBeVisible();
        }
        return;
      }

      if (testCase.type === 'single-order') {
        await expect(orderHistoryPage.rows).toHaveCount(1);
        await expect(orderHistoryPage.rowByOrderId(targetOrderId!)).toBeVisible();
        return;
      }

      if (testCase.type === 'amount-boundary') {
        const row = orderHistoryPage.rowByOrderId(targetOrderId!);
        await expect(row.locator('td').nth(2)).toHaveText(
          testCase.expectedAmount!,
        );
        return;
      }

      await expect(orderHistoryPage.rows).toHaveCount(testCase.orderCount ?? 0);
      for (const row of await orderHistoryPage.rows.all()) {
        await expect(row.locator('td')).toHaveCount(5);
        await expect(row.locator('td').nth(0)).toContainText('#');
        await expect(row.locator('td').nth(2)).toContainText('₫');
        await expect(row.locator('td').nth(3)).not.toBeEmpty();
      }
    });
  }
});
