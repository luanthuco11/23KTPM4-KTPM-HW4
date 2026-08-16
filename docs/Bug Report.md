# BÁO CÁO LỖI ESHOP – HW04

**Mã số sinh viên:** 23127414

**Môi trường:** Chromium, Firefox, WebKit; SUT EShop chạy local; Playwright 1.62.1

Chín lỗi dưới đây đều được tái hiện trên cả ba trình duyệt. Liên kết GitHub Issue nằm trong `docs/GitHub Issue Drafts.md`.

## BUG-01 – Mật khẩu có ký tự đặc biệt hợp lệ bị từ chối

- Chức năng: FR-01
- Mức độ: Cao
- Test: `TC_REG_01`, `TC_BVA_01`
- Các bước: Mở trang đăng ký, nhập tên/email hợp lệ, nhập `Pass123!` hoặc giá trị biên `Abc1234!`, sau đó gửi form.
- Mong đợi: Đăng ký thành công và chuyển đến trang đăng nhập.
- Thực tế: Giao diện báo mật khẩu yếu.
- Nguyên nhân quan sát được: Regex yêu cầu khoảng trắng (`\s`) thay cho ký tự đặc biệt.
- Bằng chứng: [Screenshot report FR-01](bug-evidence/fr01-report-summary.png)

## BUG-02 – Tên chỉ chứa khoảng trắng vẫn được chấp nhận

- Chức năng: FR-01
- Mức độ: Trung bình
- Test: `TC_REG_03`
- Các bước: Nhập ba khoảng trắng làm tên, nhập email và mật khẩu cho phép gửi form, sau đó đăng ký.
- Mong đợi: Hiển thị lỗi validation tên và vẫn ở trang đăng ký.
- Thực tế: Tài khoản được tạo và giao diện chuyển đến trang đăng nhập.
- Bằng chứng: [Screenshot report FR-01](bug-evidence/fr01-report-summary.png)

## BUG-03 – Định dạng email không hợp lệ vẫn được chấp nhận

- Chức năng: FR-01
- Mức độ: Cao
- Test: `TC_REG_05`–`TC_REG_09`
- Các bước: Đăng ký bằng email thiếu `@`, thiếu local part, thiếu domain, thiếu TLD hoặc chứa khoảng trắng.
- Mong đợi: Email không hợp lệ bị từ chối.
- Thực tế: Backend chấp nhận email và hoàn tất đăng ký.
- Bằng chứng: [Screenshot report FR-01](bug-evidence/fr01-report-summary.png)

## BUG-04 – Tổng tiền dùng sai dấu phân cách hàng nghìn của Việt Nam

- Chức năng: FR-11
- Mức độ: Thấp
- Test: `TC_ORD_10`
- Các bước: Xem đơn hàng có `total_amount = 1250000`.
- Mong đợi: `1.250.000 ₫`.
- Thực tế: `1,250,000 ₫`.
- Nguyên nhân quan sát được: `toLocaleString()` được gọi mà không có `vi-VN`.
- Bằng chứng: [Screenshot report FR-11](bug-evidence/fr11-report-summary.png)

## BUG-05 – Tên danh mục rỗng hoặc chỉ có khoảng trắng vẫn được chấp nhận

- Chức năng: FR-14
- Mức độ: Trung bình
- Test: `TC_CAT_02`, `TC_CAT_03`
- Các bước: Gửi tên danh mục rỗng hoặc chỉ gồm khoảng trắng.
- Mong đợi: HTTP 400 và hiển thị lỗi validation.
- Thực tế: HTTP 200 và một danh mục trống được thêm vào.
- Bằng chứng: [Screenshot report FR-14](bug-evidence/fr14-report-summary.png)

## BUG-06 – Tên danh mục trùng vẫn được chấp nhận

- Chức năng: FR-14
- Mức độ: Trung bình
- Test: `TC_CAT_08`
- Các bước: Tạo một danh mục, sau đó gửi lại cùng tên.
- Mong đợi: HTTP 409 hoặc thông báo validation tên trùng.
- Thực tế: HTTP 200 và danh mục thứ hai được tạo.
- Bằng chứng: [Screenshot report FR-14](bug-evidence/fr14-report-summary.png)

## BUG-07 – Có thể xóa danh mục đang được sản phẩm tham chiếu

- Chức năng: FR-14
- Mức độ: Cao
- Test: `TC_CAT_06`
- Các bước: Tạo danh mục, tạo sản phẩm thuộc danh mục đó, sau đó xóa danh mục.
- Mong đợi: HTTP 409 và thao tác xóa bị chặn.
- Thực tế: HTTP 200, danh mục bị xóa và để lại tham chiếu mồ côi.
- Bằng chứng: [Screenshot report FR-14](bug-evidence/fr14-report-summary.png)

## BUG-08 – Xóa danh mục không tồn tại vẫn báo thành công

- Chức năng: FR-14
- Mức độ: Trung bình
- Test: `TC_CAT_07`
- Các bước: Gửi `DELETE /api/categories/99999999` bằng token admin.
- Mong đợi: HTTP 404.
- Thực tế: HTTP 200 với nội dung `Category deleted`.
- Bằng chứng: [Screenshot report FR-14](bug-evidence/fr14-report-summary.png)

## BUG-09 – Người dùng thường có thể tạo danh mục qua admin API

- Chức năng: FR-14
- Mức độ: Nghiêm trọng
- Test: `TC_CAT_09`
- Các bước: Đăng nhập bằng người dùng thường và gọi `POST /api/categories` với JWT của người dùng đó.
- Mong đợi: HTTP 403.
- Thực tế: HTTP 200 và danh mục được tạo.
- Nguyên nhân quan sát được: Hệ thống kiểm tra authentication nhưng không kiểm tra role admin.
- Bằng chứng: [Screenshot report FR-14](bug-evidence/fr14-report-summary.png)
