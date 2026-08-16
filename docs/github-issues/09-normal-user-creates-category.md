## Chức năng

FR-14 – Quản lý danh mục

## Mức độ

Nghiêm trọng

## Test liên quan

`TC_CAT_09`

## Các bước tái hiện

1. Đăng nhập bằng người dùng thường.
2. Gửi `POST /api/categories` bằng JWT của người dùng đó cùng tên danh mục hợp lệ.

## Kết quả mong đợi

API trả về HTTP 403 và không tạo danh mục.

## Kết quả thực tế

API trả về HTTP 200 và tạo danh mục. Hệ thống kiểm tra authentication nhưng không bắt buộc role admin.

## Bằng chứng

![Playwright report FR-14](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
