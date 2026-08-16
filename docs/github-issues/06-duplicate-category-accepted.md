## Chức năng

FR-14 – Quản lý danh mục

## Mức độ

Trung bình

## Test liên quan

`TC_CAT_08`

## Các bước tái hiện

1. Đăng nhập bằng tài khoản admin.
2. Tạo một danh mục.
3. Gửi lại cùng tên danh mục.

## Kết quả mong đợi

API trả về HTTP 409 hoặc giao diện hiển thị thông báo validation tên trùng.

## Kết quả thực tế

API trả về HTTP 200 và tạo danh mục thứ hai có cùng tên.

## Bằng chứng

![Playwright report FR-14](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
