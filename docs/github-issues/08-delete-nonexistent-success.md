## Chức năng

FR-14 – Quản lý danh mục

## Mức độ

Trung bình

## Test liên quan

`TC_CAT_07`

## Các bước tái hiện

1. Đăng nhập bằng tài khoản admin.
2. Gửi `DELETE /api/categories/99999999` bằng token admin.

## Kết quả mong đợi

API trả về HTTP 404.

## Kết quả thực tế

API trả về HTTP 200 với nội dung `Category deleted`.

## Bằng chứng

![Playwright report FR-14](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
