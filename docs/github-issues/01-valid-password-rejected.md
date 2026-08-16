## Chức năng

FR-01 – Đăng ký tài khoản

## Mức độ

Cao

## Test liên quan

`TC_REG_01`, `TC_BVA_01`

## Các bước tái hiện

1. Mở trang đăng ký.
2. Nhập tên và email hợp lệ.
3. Nhập `Pass123!` hoặc giá trị biên `Abc1234!`.
4. Gửi form.

## Kết quả mong đợi

Đăng ký thành công và chuyển đến trang đăng nhập.

## Kết quả thực tế

Giao diện báo mật khẩu yếu. Regex validation mật khẩu yêu cầu khoảng trắng (`\s`) thay cho ký tự đặc biệt.

## Bằng chứng

![Playwright report FR-01](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr01-report-summary.png)
