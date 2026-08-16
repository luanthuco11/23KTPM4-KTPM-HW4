import { expect, type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form');
    this.nameInput = this.form.locator('input[type="text"]').nth(0);
    this.emailInput = this.form.locator('input[type="text"]').nth(1);
    this.passwordInput = this.form.locator('input[type="password"]').nth(0);
    this.confirmPasswordInput = this.form.locator('input[type="password"]').nth(1);
    this.submitButton = this.form.getByRole('button', { name: 'Đăng Ký' });
    this.errorMessage = page.locator('.bg-red-100');
  }

  async goto() {
    await this.page.goto('/register');
    await expect(
      this.page.getByRole('heading', { name: 'Đăng Ký Tài Khoản' }),
    ).toBeVisible();
  }

  async submit(
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (confirmPassword !== undefined) {
      await this.confirmPasswordInput.fill(confirmPassword);
    }
    await this.submitButton.click();
  }
}
