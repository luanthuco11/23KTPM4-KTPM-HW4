## Chức năng

FR-14 – Quản lý danh mục

## Mức độ

Trung bình

## Test liên quan

`TC_CAT_02`, `TC_CAT_03`

## Các bước tái hiện

1. Đăng nhập bằng tài khoản admin.
2. Gửi tên danh mục rỗng hoặc chỉ chứa khoảng trắng.

## Kết quả mong đợi

API trả về HTTP 400 và giao diện hiển thị lỗi validation.

## Kết quả thực tế

API trả về HTTP 200 và thêm một danh mục trống.

## Bằng chứng

![Playwright report FR-14](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
