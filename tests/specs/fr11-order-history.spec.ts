import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { OrderHistoryPage } from '../pages/order-history.page';
import {
  createOrder,
  createTestUser,
  getMyOrders,
} from '../support/eshop-api';

type OrderHistoryCase = {
  id: string;
  title: string;
  type: 'multiple-orders' | 'empty-state' | 'unauthenticated' | 'data-isolation';
  orderCount?: number;
  userAOrders?: number;
  userBOrders?: number;
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

      await orderHistoryPage.gotoAuthenticated(user.token);

      if (testCase.type === 'empty-state') {
        await expect(orderHistoryPage.emptyState).toBeVisible();
        await expect(orderHistoryPage.table).toHaveCount(0);
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
