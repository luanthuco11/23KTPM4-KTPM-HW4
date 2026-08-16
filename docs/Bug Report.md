# BÁO CÁO LỖI ESHOP – HW04

**Mã số sinh viên:** 23127414

**Môi trường:** Chromium, Firefox, WebKit; SUT EShop chạy local; Playwright 1.62.1

Bảy lỗi dưới đây có căn cứ trực tiếp từ đặc tả và đều được tái hiện trên ba trình duyệt. Liên kết GitHub Issue nằm trong `docs/GitHub Issue Drafts.md`; ba Issue #6–#8 được giữ như quan sát lịch sử cần làm rõ đặc tả, không tính vào tổng lỗi.

## BUG-01 – Mật khẩu có ký tự đặc biệt hợp lệ bị từ chối

- Chức năng: FR-01
- Mức độ: Cao
- Test: `TC_REG_01`, `TC_BVA_01`
- Các bước: Mở trang đăng ký, nhập tên/email hợp lệ, nhập `Pass123!` hoặc giá trị biên `Abc1234!`, sau đó gửi form.
- Mong đợi: Đăng ký thành công và chuyển đến trang đăng nhập.
- Thực tế: Giao diện báo mật khẩu yếu.
- Nguyên nhân quan sát được: Regex yêu cầu khoảng trắng (`\s`) thay cho ký tự đặc biệt.
- Bằng chứng: [Ảnh lỗi riêng](bug-evidence/fr01-password-special-character.png)

## BUG-02 – Tên chỉ chứa khoảng trắng vẫn được chấp nhận

- Chức năng: FR-01
- Mức độ: Trung bình
- Test: `TC_REG_03`
- Các bước: Nhập ba khoảng trắng làm tên, nhập email và mật khẩu cho phép gửi form, sau đó đăng ký.
- Mong đợi: Hiển thị lỗi validation tên và vẫn ở trang đăng ký.
- Thực tế: Tài khoản được tạo và giao diện chuyển đến trang đăng nhập.
- Bằng chứng: [Ảnh lỗi riêng](bug-evidence/fr01-whitespace-name.png)

## BUG-03 – Định dạng email không hợp lệ vẫn được chấp nhận

- Chức năng: FR-01
- Mức độ: Cao
- Test: `TC_REG_05`–`TC_REG_09`
- Các bước: Đăng ký bằng email thiếu `@`, thiếu local part, thiếu domain, thiếu TLD hoặc chứa khoảng trắng.
- Mong đợi: Email không hợp lệ bị từ chối.
- Thực tế: Backend chấp nhận email và hoàn tất đăng ký.
- Bằng chứng: [Ảnh lỗi riêng](bug-evidence/fr01-invalid-email-api.png); response API cũng được đính kèm trong HTML report.

## BUG-04 – Thiếu trường xác nhận mật khẩu

- Chức năng: FR-01
- Mức độ: Cao
- Test: `TC_REG_12`, `TC_REG_13`
- Các bước: Mở trang đăng ký và kiểm tra trường xác nhận mật khẩu; sau đó thử nhập giá trị xác nhận không khớp.
- Mong đợi: Có trường xác nhận mật khẩu và hệ thống từ chối hai giá trị không khớp.
- Thực tế: Form chỉ có một input mật khẩu.
- Bằng chứng: [Ảnh lỗi riêng](bug-evidence/fr01-missing-confirm-password.png)

## BUG-05 – Tổng tiền dùng sai dấu phân cách hàng nghìn của Việt Nam

- Chức năng: FR-11
- Mức độ: Thấp
- Test: `TC_ORD_10`
- Các bước: Xem đơn hàng có `total_amount = 1250000`.
- Mong đợi: `1.250.000 ₫`.
- Thực tế: `1,250,000 ₫`.
- Nguyên nhân quan sát được: `toLocaleString()` được gọi mà không có `vi-VN`.
- Bằng chứng: [Ảnh lỗi riêng](bug-evidence/fr11-currency-format.png)

## BUG-06 – Tên danh mục rỗng hoặc chỉ có khoảng trắng vẫn được chấp nhận

- Chức năng: FR-14
- Mức độ: Trung bình
- Test: `TC_CAT_02`, `TC_CAT_03`
- Các bước: Gửi tên danh mục rỗng hoặc chỉ gồm khoảng trắng.
- Mong đợi: HTTP 400 và hiển thị lỗi validation.
- Thực tế: HTTP 200 và một danh mục trống được thêm vào.
- Bằng chứng: [Ảnh lỗi riêng](bug-evidence/fr14-empty-category-name.png); response API cũng được đính kèm trong HTML report.

## BUG-07 – Người dùng thường có thể tạo danh mục qua admin API

- Chức năng: FR-14
- Mức độ: Nghiêm trọng
- Test: `TC_CAT_09`
- Các bước: Đăng nhập bằng người dùng thường và gọi `POST /api/categories` với JWT của người dùng đó.
- Mong đợi: HTTP 403.
- Thực tế: HTTP 200 và danh mục được tạo.
- Nguyên nhân quan sát được: Hệ thống kiểm tra authentication nhưng không kiểm tra role admin.
- Bằng chứng: [Ảnh lỗi riêng](bug-evidence/fr14-unauthorized-category-create.png); response API cũng được đính kèm trong HTML report.
