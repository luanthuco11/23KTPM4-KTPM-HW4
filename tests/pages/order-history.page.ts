import { expect, type Locator, type Page } from '@playwright/test';

export class OrderHistoryPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly table: Locator;
  readonly rows: Locator;
  readonly emptyState: Locator;
  readonly loginRequiredMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Lịch sử đơn hàng' });
    this.table = page.getByRole('table');
    this.rows = this.table.locator('tbody tr');
    this.emptyState = page.getByText('Bạn chưa có đơn hàng nào.');
    this.loginRequiredMessage = page.getByText('Vui lòng đăng nhập');
  }

  async authenticate(token: string) {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem('token', value);
    }, token);
  }

  async gotoAuthenticated(token: string) {
    await this.authenticate(token);
    await Promise.all([
      this.page.waitForResponse((response) =>
        response.url().includes('/api/orders/my-orders'),
      ),
      this.page.goto('/profile'),
    ]);
    await expect(this.heading).toBeVisible();
  }

  async gotoUnauthenticated() {
    await this.page.goto('/profile');
  }

  rowByOrderId(orderId: number) {
    return this.table.getByText(`#${orderId}`, { exact: true }).locator('..');
  }
}
