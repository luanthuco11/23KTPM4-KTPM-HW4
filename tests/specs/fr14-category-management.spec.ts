import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { CategoryManagementPage } from '../pages/category-management.page';
import {
  createCategory,
  createProductForCategory,
  createTestUser,
  deleteCategory,
  loginAsAdmin,
} from '../support/eshop-api';

type CategoryCase = {
  id: string;
  title: string;
  type:
    | 'create-valid'
    | 'list-categories'
    | 'delete-empty'
    | 'reject-non-admin'
    | 'reject-invalid-name'
    | 'reject-delete-referenced'
    | 'reject-delete-missing'
    | 'reject-duplicate';
  name?: string;
  categoryCount?: number;
  categoryId?: number;
  expectedStatus?: number;
};

const dataPath = path.resolve(process.cwd(), 'tests/data/categories.json');
const categoryCases = JSON.parse(readFileSync(dataPath, 'utf8')) as CategoryCase[];

function materialize(value: string, uniqueValue: string) {
  return value.replaceAll('{{unique}}', uniqueValue);
}

test.describe('FR-14 — Quản lý danh mục', () => {
  for (const [index, testCase] of categoryCases.entries()) {
    test(`${testCase.id} — ${testCase.title}`, async ({ page, request }, testInfo) => {
      const uniqueValue = `${testInfo.project.name}-${Date.now()}-${testInfo.workerIndex}-${index}`;
      const adminToken = await loginAsAdmin(request);
      const categoryPage = new CategoryManagementPage(page);
      const categoryName = materialize(testCase.name ?? '', uniqueValue);

      if (testCase.type === 'reject-non-admin') {
        const user = await createTestUser(request, uniqueValue);
        const response = await request.post('http://127.0.0.1:3000/api/categories', {
          headers: { Authorization: `Bearer ${user.token}` },
          data: { name: categoryName },
        });
        expect(response.status()).toBe(403);
        return;
      }

      if (testCase.type === 'list-categories') {
        const names = [];
        for (let i = 0; i < (testCase.categoryCount ?? 0); i += 1) {
          const name = `HW04 List ${uniqueValue}-${i}`;
          await createCategory(request, adminToken, name);
          names.push(name);
        }
        await categoryPage.goto(adminToken);
        for (const name of names) {
          await expect(categoryPage.rowByName(name)).toBeVisible();
        }
        for (const column of ['ID', 'Tên Danh Mục', 'Hành động']) {
          await expect(
            categoryPage.table.getByRole('columnheader', { name: column }),
          ).toBeVisible();
        }
        return;
      }

      if (testCase.type === 'reject-delete-missing') {
        const response = await deleteCategory(
          request,
          adminToken,
          testCase.categoryId!,
        );
        expect(response.status()).toBe(testCase.expectedStatus);
        return;
      }

      if (testCase.type === 'reject-delete-referenced') {
        const categoryId = await createCategory(
          request,
          adminToken,
          categoryName,
        );
        await createProductForCategory(request, categoryId, uniqueValue);
        const response = await deleteCategory(request, adminToken, categoryId);
        expect(response.status()).toBe(testCase.expectedStatus);
        return;
      }

      if (testCase.type === 'reject-duplicate') {
        await createCategory(request, adminToken, categoryName);
        await categoryPage.goto(adminToken);
        const response = await categoryPage.addCategory(categoryName);
        expect(response.status()).toBe(testCase.expectedStatus);
        return;
      }

      await categoryPage.goto(adminToken);

      if (testCase.type === 'reject-invalid-name') {
        const response = await categoryPage.addCategory(categoryName);
        expect(response.status()).toBe(testCase.expectedStatus);
        await expect(categoryPage.nameInput).toHaveValue(categoryName);
        return;
      }

      if (testCase.type === 'create-valid') {
        const response = await categoryPage.addCategory(categoryName);
        expect(response.ok()).toBe(true);
        await expect(categoryPage.rowByName(categoryName)).toBeVisible();
        await expect(categoryPage.nameInput).toBeEmpty();
        return;
      }

      await createCategory(request, adminToken, categoryName);
      await page.reload();
      await page.getByText('Danh mục', { exact: true }).click();
      await expect(categoryPage.rowByName(categoryName)).toBeVisible();
      const response = await categoryPage.deleteCategory(categoryName);
      expect(response.ok()).toBe(true);
      await expect(categoryPage.rowByName(categoryName)).toHaveCount(0);
    });
  }
});
