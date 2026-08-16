# BÁO CÁO CHÍNH HW04 – KIỂM THỬ TỰ ĐỘNG

## 1. Thông tin sinh viên và bài tập

- Mã số sinh viên: **23127414**
- Bài tập: **HW04 – Automation Testing**
- Hệ thống được kiểm thử (SUT): **EShop**
- Framework kiểm thử: **Playwright 1.62.1**
- Trình duyệt: **Chromium, Firefox, WebKit**
- Tuyên bố sử dụng AI: **Tôi sử dụng công cụ AI cho các công việc sau:** phân tích yêu cầu, soạn dữ liệu kiểm thử, dựng khung Playwright, rà soát mã, phân tích kết quả thực thi, chuẩn bị báo cáo và xây dựng Agent Skill. Toàn bộ nội dung do AI hỗ trợ đều được con người rà soát và chạy trên SUT thực tế.

## 2. Lựa chọn chức năng

Ba chức năng web đã chọn trong HW02 được tiếp tục tự động hóa:

| Nhóm | ID | Chức năng |
|---|---|---|
| A | FR-01 | Đăng ký tài khoản |
| B | FR-11 | Xem lịch sử đơn hàng của người dùng |
| C | FR-14 | Quản lý danh mục |

Chức năng mobile của HW02 không được sử dụng vì HW04 yêu cầu tự động hóa web frontend.

## 3. Thiết kế bộ kiểm thử tự động

Bộ kiểm thử sử dụng Page Object theo hướng data-driven:

- `tests/data`: dữ liệu kiểm thử JSON tách riêng.
- `tests/pages`: locator và thao tác giao diện.
- `tests/support`: các hàm API chuẩn bị điều kiện trước một cách xác định.
- `tests/specs`: test script và assertion của từng chức năng.
- `reports`: bằng chứng thực thi đã lưu trữ.

Cấu hình Playwright chạy mọi chức năng trên Chromium, Firefox và WebKit. Test thất bại giữ lại screenshot, video và trace. Metadata của report có `Run by: 23127414` cùng timestamp theo chuẩn ISO.

Bộ kiểm thử sử dụng ít nhất ba dạng assertion, gồm kiểm tra URL, trạng thái hiển thị, nội dung, số lượng, class, tính hợp lệ của input, HTTP status, độ dài collection và quyền sở hữu dữ liệu.

## 4. Tóm tắt kết quả thực thi

| Chức năng | Số test case | Lượt thực thi | Thành công | Thất bại | Timestamp report (UTC) |
|---|---:|---:|---:|---:|---|
| FR-01 | 12 | 36 | 12 | 24 | 2026-08-14T12:41:07.395Z |
| FR-11 | 15 | 45 | 42 | 3 | 2026-08-14T12:32:37.193Z |
| FR-14 | 12 | 36 | 18 | 18 | 2026-08-14T12:38:54.878Z |
| **Tổng cộng** | **39** | **117** | **72** | **45** | |

Có chín lượt chạy chức năng–trình duyệt: ba chức năng nhân với ba trình duyệt. Các failure được trình bày dưới đây đều tái hiện ổn định trên cả ba trình duyệt.

## 5. FR-01 – Đăng ký tài khoản

### Phạm vi và dữ liệu

Mười hai test case bao phủ đăng ký thành công, trường bắt buộc, tên chỉ chứa khoảng trắng, các phân vùng email không hợp lệ, mật khẩu yếu và giá trị biên tám ký tự của mật khẩu. Dữ liệu nằm trong `tests/data/registration.json`.

### Kết quả

- 12 lượt thực thi thành công.
- 24 lượt thực thi thất bại.
- Tám test case thất bại được tái hiện trên cả ba trình duyệt.

### Lỗi thật của SUT

1. Mật khẩu chứa ký tự đặc biệt hợp lệ bị từ chối vì regex frontend yêu cầu khoảng trắng thay cho ký tự đặc biệt.
2. Tên chỉ chứa khoảng trắng vẫn được chấp nhận.
3. Các định dạng email không hợp lệ vẫn được chấp nhận vì input dùng `type="text"` và cả frontend lẫn backend đều không kiểm tra định dạng.

### Con người rà soát kết quả AI

Phương án AI ban đầu có thể làm test email thất bại sai nguyên nhân: biểu thức mật khẩu bị lỗi chặn request trước khi hệ thống kiểm tra email. Bản cuối sử dụng mật khẩu chứa khoảng trắng riêng cho các test email không hợp lệ để vượt qua cổng kiểm tra sai của SUT và cô lập đúng hành vi email. Giá trị email duy nhất được thêm vào để ngăn xung đột giữa các trình duyệt. Cách nạp JSON cũng được đổi từ `import.meta` sang đường dẫn dựa trên thư mục làm việc sau khi lượt chạy đầu phát hiện lỗi module. Locator giới hạn trong form chỉ được giữ ở nơi SUT thiếu liên kết `htmlFor` cho label.

## 6. FR-11 – Xem lịch sử đơn hàng

### Phạm vi và dữ liệu

Mười lăm test case bao phủ truy cập đã đăng nhập, empty state, truy cập chưa đăng nhập, cô lập quyền sở hữu, năm trạng thái cùng màu hiển thị, các cột bắt buộc, định dạng tiền và biên 0/1. Dữ liệu nằm trong `tests/data/order-history.json`.

Bước chuẩn bị qua API tạo người dùng và đơn hàng duy nhất cho từng worker. Trạng thái đơn hàng đi theo lộ trình chuyển trạng thái hợp lệ của backend trước khi kiểm tra giao diện.

### Kết quả

- 42 lượt thực thi thành công.
- 3 lượt thực thi thất bại.
- Cùng một lỗi định dạng tiền tái hiện trên cả ba trình duyệt.

### Lỗi thật của SUT

Giao diện gọi `toLocaleString()` nhưng không chỉ định `vi-VN`, vì vậy môi trường kiểm thử hiển thị `1,250,000 ₫` thay cho định dạng Việt Nam được yêu cầu là `1.250.000 ₫`.

### Con người rà soát kết quả AI

Không sử dụng fixed wait. Page Object chờ phản hồi thật của API `my-orders` trước khi kiểm tra bảng. Việc cô lập dữ liệu được assertion trên mọi `user_id` trả về, không chỉ dựa vào số dòng nhìn thấy. Các test biên dùng người dùng tách biệt hoặc fixture được kiểm soát thay vì phụ thuộc trạng thái không xác định của cơ sở dữ liệu dùng chung.

## 7. FR-14 – Quản lý danh mục

### Phạm vi và dữ liệu

Mười hai test case bao phủ tạo mới, hiển thị danh sách, xóa, tên rỗng hoặc chỉ có khoảng trắng, danh mục đang được sản phẩm tham chiếu, ID không tồn tại, tên trùng, truy cập không có quyền admin, tên một ký tự và biên danh sách 0/1. Dữ liệu nằm trong `tests/data/categories.json`.

### Kết quả

- 18 lượt thực thi thành công.
- 18 lượt thực thi thất bại.
- Sáu test case thất bại được tái hiện trên cả ba trình duyệt.

### Lỗi thật của SUT

1. Tên rỗng và tên chỉ chứa khoảng trắng vẫn được chấp nhận.
2. Tên danh mục trùng vẫn được chấp nhận.
3. Danh mục đang được sản phẩm tham chiếu vẫn có thể bị xóa.
4. Xóa ID không tồn tại vẫn trả về thành công.
5. Token của người dùng thường có thể tạo danh mục vì thiếu kiểm tra role.

### Con người rà soát kết quả AI

Bộ test cuối kiểm tra chính xác HTTP status cho hành vi API không hợp lệ thay vì coi mọi request hoàn tất là thành công. Test tự tạo danh mục và sản phẩm tham chiếu thay vì phụ thuộc seed ID. Test biên hiển thị 0/1 chỉ mock phản hồi GET danh mục, nhờ đó assertion giao diện có tính xác định mà không ghi lại cơ sở dữ liệu SUT.

## 8. Phân tích lỗi

Chín lỗi khác nhau được ghi nhận trong `docs/Bug Report.md`. Một automated test thất bại chỉ được phân loại là lỗi SUT khi:

1. assertion phù hợp với yêu cầu đã viết;
2. failure lặp lại trên Chromium, Firefox và WebKit;
3. có screenshot, trace hoặc bằng chứng response; và
4. luồng automation đã được rà soát về selector, cách chờ, dữ liệu và assertion.

## 9. Phân tích khoảng trống của AI

AI giúp tăng tốc việc dựng khung và chuyển đổi các phần lặp lại, nhưng ban đầu thiếu ba loại ngữ cảnh: các lỗi được cài có chủ đích trong SUT, yêu cầu cô lập một nguyên nhân lỗi cho mỗi test và trạng thái cơ sở dữ liệu dùng chung giữa các browser worker. Con người bổ sung dữ liệu duy nhất, điều kiện trước qua API, thiết lập chuyển trạng thái, fixture biên có tính xác định, kiểm tra metadata report và khôi phục cơ sở dữ liệu. Vì vậy, kết quả AI được xem là bản nháp chứ không phải bằng chứng kiểm thử đã được chấp nhận.

## 10. Khả năng tái hiện và bằng chứng

- HTML report: `reports/fr01`, `reports/fr11` và `reports/fr14`.
- Dữ liệu kiểm thử: `tests/data`.
- Test script: `tests/specs`.
- Screenshot bằng chứng: `docs/bug-evidence`.
- Lịch sử Git: tám commit có thay đổi file `.spec.ts`.
- Agent Skill: `agent-skills/eshop-playwright-automation`.

## 11. Bằng chứng nộp bài

### Bằng chứng video

- Video demo Task 2: [YouTube – Không công khai](https://youtu.be/wVz2drOVd2E).
- Video demo Agent Skill: [YouTube – Không công khai](https://youtu.be/lPOh3j1v4oU).
- Video Task 2 được xác nhận dài ít nhất năm phút, có thuyết minh tiếng Việt và bằng chứng danh tính.
- Video Agent Skill được xác nhận trình diễn một chức năng hoàn chỉnh từ lúc gọi skill, kiểm tra, thực thi, đọc report, phân loại failure đến kết luận.
- Chín GitHub Issues có screenshot đã được tạo trong repository công khai của sinh viên.

Kịch bản đã chuẩn bị và liên kết Issue được lưu trong `docs/Video Script.md` và `docs/GitHub Issue Drafts.md`.

### Tự đánh giá

| Tiêu chí | Điểm tối đa | Điểm tự đánh giá |
|---|---:|---:|
| Task 1 – Chức năng A (FR-01) | 25 | 25 |
| Task 1 – Chức năng B (FR-11) | 25 | 25 |
| Task 1 – Chức năng C (FR-14) | 25 | 25 |
| Task 2 – Video demo | 15 | 15 |
| Agent Skill | 10 | 10 |
| **Tổng cộng** | **100** | **100** |

Tên file nộp bài: `23127414_HW04_AI_Automation_100.zip`.

## 12. Kết luận

Bộ kiểm thử hoàn chỉnh tự động hóa 39 test case với 117 lượt thực thi trên trình duyệt. Các assertion thất bại làm lộ ra chín lỗi có thể tái hiện được giữ nguyên. Bài nộp có dữ liệu, test script, HTML report đa trình duyệt, ghi chú con người rà soát, bằng chứng commit và Agent Skill có thể tái sử dụng đã được xác thực.
