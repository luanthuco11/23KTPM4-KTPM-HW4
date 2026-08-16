import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { RegistrationPage } from '../pages/registration.page';
import { deleteTestUser, loginAsAdmin, registerUser } from '../support/eshop-api';

type RegistrationExpectation =
  | 'success'
  | 'required-name'
  | 'required-email'
  | 'weak-password'
  | 'blank-name-api'
  | 'invalid-email-api'
  | 'confirmation-field'
  | 'password-mismatch';

type RegistrationCase = {
  id: string;
  title: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  expectation: RegistrationExpectation;
};

const dataPath = path.resolve(
  process.cwd(),
  'tests/data/registration.json',
);
const registrationCases = JSON.parse(
  readFileSync(dataPath, 'utf8'),
) as RegistrationCase[];

function materialize(value: string, uniqueValue: string) {
  return value.replaceAll('{{unique}}', uniqueValue);
}

test.describe('FR-01 — Đăng ký tài khoản', () => {
  test.beforeAll(() => {
    expect(registrationCases.length).toBeGreaterThanOrEqual(12);
    expect(new Set(registrationCases.map(({ id }) => id)).size).toBe(
      registrationCases.length,
    );
  });

  for (const [index, testCase] of registrationCases.entries()) {
    test(`${testCase.id} — ${testCase.title}`, async ({ page, request }, testInfo) => {
      const registrationPage = new RegistrationPage(page);
      const uniqueValue = `${Date.now()}-${testInfo.workerIndex}-${index}`;
      const email = materialize(testCase.email, uniqueValue);

      if (testCase.expectation === 'invalid-email-api') {
        const response = await registerUser(request, {
          name: testCase.name,
          email,
          password: testCase.password,
        });
        const responseBody = await response.json();

        try {
          await testInfo.attach('Phản hồi API đăng ký với email không hợp lệ', {
            body: JSON.stringify(
              { status: response.status(), response: responseBody },
              null,
              2,
            ),
            contentType: 'application/json',
          });
          expect(response.status()).toBe(400);
        } finally {
          if (typeof responseBody.id === 'number') {
            const adminToken = await loginAsAdmin(request);
            await deleteTestUser(request, adminToken, responseBody.id);
          }
        }
        return;
      }

      await registrationPage.goto();

      if (testCase.expectation === 'blank-name-api') {
        const response = await Promise.all([
          page.waitForResponse(
            (candidate) =>
              candidate.url().includes('/api/register') &&
              candidate.request().method() === 'POST',
          ),
          registrationPage.submit(testCase.name, email, testCase.password),
        ]).then(([candidate]) => candidate);
        const responseBody = await response.json();

        try {
          await testInfo.attach('Phản hồi API đăng ký với tên trắng', {
            body: JSON.stringify(
              { status: response.status(), response: responseBody },
              null,
              2,
            ),
            contentType: 'application/json',
          });
          expect(response.status()).toBe(400);
          await expect(page).toHaveURL(/\/register$/);
        } finally {
          if (typeof responseBody.id === 'number') {
            const adminToken = await loginAsAdmin(request);
            await deleteTestUser(request, adminToken, responseBody.id);
          }
        }
        return;
      }

      if (testCase.expectation === 'confirmation-field') {
        await expect(registrationPage.confirmPasswordInput).toBeVisible();
        return;
      }

      if (testCase.expectation === 'password-mismatch') {
        await expect(registrationPage.confirmPasswordInput).toBeVisible();
        await registrationPage.submit(
          testCase.name,
          email,
          testCase.password,
          testCase.confirmPassword,
        );
        await expect(page).toHaveURL(/\/register$/);
        await expect(registrationPage.errorMessage).toBeVisible();
        return;
      }

      await registrationPage.submit(
        testCase.name,
        email,
        testCase.password,
      );

      if (testCase.expectation === 'success') {
        await expect(page).toHaveURL(/\/login$/);
        return;
      }

      if (testCase.expectation === 'required-name') {
        await expect(registrationPage.nameInput).toBeEmpty();
        expect(
          await registrationPage.nameInput.evaluate((element) =>
            (element as HTMLInputElement).checkValidity(),
          ),
        ).toBe(false);
        await expect(page).toHaveURL(/\/register$/);
        return;
      }

      if (testCase.expectation === 'required-email') {
        await expect(registrationPage.emailInput).toBeEmpty();
        expect(
          await registrationPage.emailInput.evaluate((element) =>
            (element as HTMLInputElement).checkValidity(),
          ),
        ).toBe(false);
        await expect(page).toHaveURL(/\/register$/);
        return;
      }

      if (testCase.expectation === 'weak-password') {
        await expect(registrationPage.errorMessage).toBeVisible();
        await expect(registrationPage.errorMessage).toContainText(
          'Mật khẩu quá yếu',
        );
        await expect(page).toHaveURL(/\/register$/);
        return;
      }

      throw new Error(`Unsupported expectation: ${testCase.expectation}`);
    });
  }
});
