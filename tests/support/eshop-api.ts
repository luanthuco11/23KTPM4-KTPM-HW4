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

export async function registerUser(
  request: APIRequestContext,
  data: { name: string; email: string; password: string },
) {
  return request.post(`${apiBaseUrl}/api/register`, { data });
}

export async function deleteTestUser(
  request: APIRequestContext,
  adminToken: string,
  userId: number,
) {
  return request.delete(`${apiBaseUrl}/api/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
}

export async function deleteProduct(
  request: APIRequestContext,
  productId: number,
) {
  return request.delete(`${apiBaseUrl}/api/products/${productId}`);
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

export async function loginAsAdmin(request: APIRequestContext) {
  const response = await request.post(`${apiBaseUrl}/api/login`, {
    data: {
      email: 'admin@eshop.com',
      password: 'Admin123!',
    },
  });
  expect(response.ok()).toBe(true);
  return (await response.json()).token as string;
}

export async function setOrderStatus(
  request: APIRequestContext,
  adminToken: string,
  orderId: number,
  targetStatus: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'canceled',
) {
  const transitionPaths = {
    pending: [],
    confirmed: ['confirmed'],
    shipping: ['confirmed', 'shipping'],
    delivered: ['confirmed', 'shipping', 'delivered'],
    canceled: ['canceled'],
  } as const;

  for (const status of transitionPaths[targetStatus]) {
    const response = await request.put(
      `${apiBaseUrl}/api/admin/orders/${orderId}/status`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
        data: { status },
      },
    );
    expect(response.ok()).toBe(true);
  }
}

export async function createCategory(
  request: APIRequestContext,
  token: string,
  name: string,
) {
  const response = await request.post(`${apiBaseUrl}/api/categories`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { name },
  });
  expect(response.ok()).toBe(true);
  return (await response.json()).id as number;
}

export async function deleteCategory(
  request: APIRequestContext,
  token: string,
  categoryId: number,
) {
  return request.delete(`${apiBaseUrl}/api/categories/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createProductForCategory(
  request: APIRequestContext,
  categoryId: number,
  uniqueValue: string,
) {
  const response = await request.post(`${apiBaseUrl}/api/products`, {
    data: {
      name: `HW04 Product ${uniqueValue}`,
      price: 100_000,
      description: 'Sản phẩm dùng để kiểm thử ràng buộc danh mục',
      imageUrl: 'https://placehold.co/300',
      category_id: categoryId,
    },
  });
  expect(response.ok()).toBe(true);
  return (await response.json()).id as number;
}
