## Chức năng

FR-14 – Quản lý danh mục

## Mức độ

Cao

## Test liên quan

`TC_CAT_06`

## Các bước tái hiện

1. Đăng nhập bằng tài khoản admin.
2. Tạo một danh mục.
3. Tạo một sản phẩm thuộc danh mục đó.
4. Xóa danh mục.

## Kết quả mong đợi

API trả về HTTP 409 và chặn thao tác xóa.

## Kết quả thực tế

API trả về HTTP 200, xóa danh mục và để lại tham chiếu sản phẩm mồ côi.

## Bằng chứng

![Playwright report FR-14](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
