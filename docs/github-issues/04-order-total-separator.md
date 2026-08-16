## Chức năng

FR-11 – Xem lịch sử đơn hàng

## Mức độ

Thấp

## Test liên quan

`TC_ORD_10`

## Các bước tái hiện

1. Đăng nhập bằng người dùng có đơn hàng với `total_amount = 1250000`.
2. Mở trang lịch sử đơn hàng.

## Kết quả mong đợi

Số tiền hiển thị là `1.250.000 ₫` theo locale Việt Nam.

## Kết quả thực tế

Số tiền hiển thị là `1,250,000 ₫`. `toLocaleString()` được gọi mà không có locale `vi-VN`.

## Bằng chứng

![Playwright report FR-11](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr11-report-summary.png)
