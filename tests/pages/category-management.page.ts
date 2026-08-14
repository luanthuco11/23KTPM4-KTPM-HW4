import { expect, type Page } from '@playwright/test';

const adminBaseUrl = process.env.ADMIN_BASE_URL ?? 'http://127.0.0.1:5174';

export class CategoryManagementPage {
  readonly page: Page;
  readonly heading;
  readonly table;
  readonly rows;
  readonly nameInput;
  readonly addButton;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Quản lý Danh mục' });
    this.table = page.getByRole('table');
    this.rows = this.table.locator('tbody tr');
    this.nameInput = page.getByPlaceholder('Tên danh mục mới');
    this.addButton = page.getByRole('button', { name: 'Thêm mới' });
  }

  async goto(
    adminToken: string,
    categoriesFixture?: Array<{ id: number; name: string }>,
  ) {
    if (categoriesFixture) {
      await this.page.route('**/api/categories', async (route) => {
        if (route.request().method() === 'GET') {
          await route.fulfill({ json: categoriesFixture });
          return;
        }
        await route.continue();
      });
    }
    await this.page.addInitScript((token) => {
      window.localStorage.setItem('adminToken', token);
    }, adminToken);
    await this.page.goto(adminBaseUrl);
    await this.page.getByText('Danh mục', { exact: true }).click();
    await expect(this.heading).toBeVisible();
  }

  rowByName(name: string) {
    return this.table.getByText(name, { exact: true }).locator('..');
  }

  async addCategory(name: string) {
    await this.nameInput.fill(name);
    return Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().endsWith('/api/categories') &&
          response.request().method() === 'POST',
      ),
      this.addButton.click(),
    ]).then(([response]) => response);
  }

  async deleteCategory(name: string) {
    const row = this.rowByName(name);
    return Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('/api/categories/') &&
          response.request().method() === 'DELETE',
      ),
      row.getByRole('button', { name: 'Xóa' }).click(),
    ]).then(([response]) => response);
  }
}
