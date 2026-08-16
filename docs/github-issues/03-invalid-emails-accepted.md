## Chức năng

FR-01 – Đăng ký tài khoản

## Mức độ

Cao

## Test liên quan

`TC_REG_05`–`TC_REG_09`

## Các bước tái hiện

1. Mở trang đăng ký.
2. Nhập email thiếu `@`, thiếu local part, domain hoặc TLD, hoặc chứa khoảng trắng.
3. Hoàn tất các trường còn lại và gửi form.

## Kết quả mong đợi

Email không hợp lệ bị từ chối.

## Kết quả thực tế

Backend chấp nhận email không hợp lệ và hoàn tất đăng ký.

## Bằng chứng

![Playwright report FR-01](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr01-report-summary.png)
