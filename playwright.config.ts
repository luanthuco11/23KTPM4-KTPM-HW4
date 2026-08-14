import { defineConfig, devices } from '@playwright/test';

const studentId = '23127414';
const runTimestamp = new Date().toISOString();

export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
        title: `HW04 Automation Testing | Run by: ${studentId} | ${runTimestamp}`,
      },
    ],
  ],
  metadata: {
    studentId,
    runBy: `Run by: ${studentId}`,
    runTimestamp,
  },
  use: {
    baseURL: process.env.WEB_BASE_URL ?? 'http://127.0.0.1:5173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: [
    {
      command: 'node server.js',
      cwd: './backend',
      url: 'http://127.0.0.1:3000/api/products',
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 5173',
      cwd: './frontend-web',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'npm run dev -- --host 127.0.0.1',
      cwd: './frontend-admin',
      url: 'http://127.0.0.1:5174',
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
