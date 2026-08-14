import { expect, type APIRequestContext } from '@playwright/test';

const apiBaseUrl = process.env.API_BASE_URL ?? 'http://127.0.0.1:3000';

export type TestUser = {
  id: number;
  email: string;
  password: string;
  token: string;
};

export async function createTestUser(
  request: APIRequestContext,
  uniqueValue: string,
): Promise<TestUser> {
  const email = `hw04-${uniqueValue}@example.com`;
  const password = 'Test1234!';
  const registrationResponse = await request.post(`${apiBaseUrl}/api/register`, {
    data: {
      name: `HW04 User ${uniqueValue}`,
      email,
      password,
    },
  });
  expect(registrationResponse.ok()).toBe(true);

  const loginResponse = await request.post(`${apiBaseUrl}/api/login`, {
    data: { email, password },
  });
  expect(loginResponse.ok()).toBe(true);
  const loginBody = await loginResponse.json();

  return {
    id: loginBody.user.id,
    email,
    password,
    token: loginBody.token,
  };
}

export async function createOrder(
  request: APIRequestContext,
  token: string,
  totalAmount: number,
): Promise<number> {
  const response = await request.post(`${apiBaseUrl}/api/checkout`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      total_amount: totalAmount,
      shipping_address: '227 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    },
  });
  expect(response.ok()).toBe(true);
  return (await response.json()).orderId;
}

export async function getMyOrders(
  request: APIRequestContext,
  token: string,
) {
  const response = await request.get(`${apiBaseUrl}/api/orders/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(response.ok()).toBe(true);
  return response.json();
}
