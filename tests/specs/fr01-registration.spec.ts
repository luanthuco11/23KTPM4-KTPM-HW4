import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { RegistrationPage } from '../pages/registration.page';

type RegistrationExpectation =
  | 'success'
  | 'required-name'
  | 'required-email'
  | 'weak-password'
  | 'rejected';

type RegistrationCase = {
  id: string;
  title: string;
  name: string;
  email: string;
  password: string;
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
  for (const [index, testCase] of registrationCases.entries()) {
    test(`${testCase.id} — ${testCase.title}`, async ({ page }, testInfo) => {
      const registrationPage = new RegistrationPage(page);
      const uniqueValue = `${Date.now()}-${testInfo.workerIndex}-${index}`;

      await registrationPage.goto();
      await registrationPage.submit(
        testCase.name,
        materialize(testCase.email, uniqueValue),
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

      await expect(page).toHaveURL(/\/register$/);
      await expect(registrationPage.errorMessage).toBeVisible();
    });
  }
});
