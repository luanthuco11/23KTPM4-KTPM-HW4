# BÁO CÁO CHÍNH HW04 – KIỂM THỬ TỰ ĐỘNG

## 1. Thông tin sinh viên và bài tập

- Mã số sinh viên: **23127414**
- Bài tập: **HW04 – Automation Testing**
- Hệ thống được kiểm thử (SUT): **EShop**
- Framework kiểm thử: **Playwright 1.62.1**
- Trình duyệt: **Chromium, Firefox, WebKit**
- Tuyên bố sử dụng AI: **Em sử dụng công cụ AI cho các công việc sau:** phân tích yêu cầu, soạn dữ liệu kiểm thử, dựng khung Playwright, rà soát mã, phân tích kết quả thực thi, chuẩn bị báo cáo và xây dựng Agent Skill. Toàn bộ nội dung do AI hỗ trợ đều được con người rà soát và chạy trên SUT thực tế.

## 2. Lựa chọn chức năng

Ba chức năng web đã chọn trong HW02 được tiếp tục tự động hóa:

| Nhóm | ID    | Chức năng                           |
| ---- | ----- | ----------------------------------- |
| A    | FR-01 | Đăng ký tài khoản                   |
| B    | FR-11 | Xem lịch sử đơn hàng của người dùng |
| C    | FR-14 | Quản lý danh mục                    |

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

| Chức năng     | Số test case | Lượt thực thi | Thành công | Thất bại | Timestamp report (UTC)   |
| ------------- | -----------: | ------------: | ---------: | -------: | ------------------------ |
| FR-01         |           14 |            42 |         12 |       30 | 2026-08-16T11:02:08.000Z |
| FR-11         |           15 |            45 |         42 |        3 | 2026-08-16T11:03:58.000Z |
| FR-14         |           12 |            36 |         27 |        9 | 2026-08-16T11:05:27.000Z |
| **Tổng cộng** |       **41** |       **123** |     **81** |   **42** |                          |

Có chín lượt chạy chức năng–trình duyệt: ba chức năng nhân với ba trình duyệt. Các failure được trình bày dưới đây đều tái hiện ổn định trên cả ba trình duyệt.

## 5. FR-01 – Đăng ký tài khoản

### Phạm vi và dữ liệu

Mười bốn test case bao phủ đăng ký thành công, trường bắt buộc, tên chỉ chứa khoảng trắng, các phân vùng email không hợp lệ, mật khẩu yếu, giá trị biên tám ký tự và yêu cầu xác nhận mật khẩu. Dữ liệu nằm trong `tests/data/registration.json`.

### Kết quả

- 12 lượt thực thi thành công.
- 30 lượt thực thi thất bại.
- Mười test case thất bại được tái hiện trên cả ba trình duyệt.

### Lỗi thật của SUT

1. Mật khẩu chứa ký tự đặc biệt hợp lệ bị từ chối vì regex frontend yêu cầu khoảng trắng thay cho ký tự đặc biệt.
2. Tên chỉ chứa khoảng trắng vẫn được chấp nhận.
3. Các định dạng email không hợp lệ vẫn được chấp nhận vì input dùng `type="text"` và cả frontend lẫn backend đều không kiểm tra định dạng.
4. Trang đăng ký không có trường xác nhận mật khẩu nên không thể chặn hai mật khẩu không khớp.

### Con người rà soát kết quả AI

Phương án AI ban đầu có thể làm test email thất bại sai nguyên nhân: biểu thức mật khẩu bị lỗi chặn request trước khi hệ thống kiểm tra email. Bản cuối chuyển các phân vùng email không hợp lệ sang assertion hợp đồng API, dùng mật khẩu đúng theo đặc tả và đính kèm response vào report; vì vậy failure chỉ còn phản ánh validation email. Hai test riêng kiểm tra sự hiện diện của trường xác nhận mật khẩu và việc từ chối giá trị không khớp. Giá trị email duy nhất được thêm vào để ngăn xung đột giữa các lần chạy.

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

Mười hai test case bao phủ tạo mới, hiển thị danh sách, xóa, tên rỗng hoặc chỉ có khoảng trắng, hiển thị danh mục có sản phẩm tham chiếu, thao tác sau khi tải lại trang, tên trùng theo hành vi hiện tại, truy cập không có quyền admin, tên một ký tự và biên danh sách 0/1. Dữ liệu nằm trong `tests/data/categories.json`.

### Kết quả

- 27 lượt thực thi thành công.
- 9 lượt thực thi thất bại.
- Ba test case thất bại được tái hiện trên cả ba trình duyệt.

### Lỗi thật của SUT

1. Tên rỗng và tên chỉ chứa khoảng trắng vẫn được chấp nhận.
2. Token của người dùng thường có thể tạo danh mục vì thiếu kiểm tra role.

### Con người rà soát kết quả AI

Bộ test cuối chỉ áp dụng HTTP status khi đặc tả quy định rõ kết quả: tên danh mục bắt buộc và API quản trị yêu cầu role admin. Các tình huống tên trùng, xóa ID không tồn tại và xóa danh mục đang được tham chiếu được chuyển thành kiểm tra giao diện/hành vi hiện tại, không kết luận là lỗi khi đề không nêu quy tắc. Test tự tạo danh mục và sản phẩm tham chiếu thay vì phụ thuộc seed ID. Vì EShop dùng SQLite chung, cấu hình chạy tuần tự để dữ liệu giữa browser không làm nhiễu nhau.

## 8. Phân tích lỗi

Bảy lỗi khác nhau được ghi nhận trong `docs/Bug Report.md`. Một automated test thất bại chỉ được phân loại là lỗi SUT khi:

1. assertion phù hợp với yêu cầu đã viết;
2. failure lặp lại trên Chromium, Firefox và WebKit;
3. có screenshot, trace hoặc bằng chứng response; và
4. luồng automation đã được rà soát về selector, cách chờ, dữ liệu và assertion.

## 9. Phân tích khoảng trống của AI

AI giúp tăng tốc việc dựng khung và chuyển đổi các phần lặp lại, nhưng ban đầu thiếu ba loại ngữ cảnh: các lỗi được cài có chủ đích trong SUT, yêu cầu cô lập một nguyên nhân lỗi cho mỗi test và SQLite dùng chung giữa các browser worker. Con người bổ sung dữ liệu duy nhất, điều kiện trước qua API, assertion hợp đồng API cho validation email, kiểm tra cô lập dữ liệu trên giao diện, thực thi tuần tự, fixture biên có tính xác định và kiểm tra metadata report. Vì vậy, kết quả AI được xem là bản nháp chứ không phải bằng chứng kiểm thử đã được chấp nhận.

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

### Tự đánh giá

| Tiêu chí                     | Điểm tối đa | Điểm tự đánh giá |
| ---------------------------- | ----------: | ---------------: |
| Task 1 – Chức năng A (FR-01) |          25 |               25 |
| Task 1 – Chức năng B (FR-11) |          25 |               25 |
| Task 1 – Chức năng C (FR-14) |          25 |               25 |
| Task 2 – Video demo          |          15 |               15 |
| Agent Skill                  |          10 |               10 |
| **Tổng cộng**                |     **100** |          **100** |

Tên file nộp bài: `23127414_HW04_AI_Automation_100.zip`.

## 12. Kết luận

Bộ kiểm thử hoàn chỉnh tự động hóa 41 test case với 123 lượt thực thi trên trình duyệt. Các assertion thất bại làm lộ ra bảy lỗi có căn cứ từ đặc tả và có thể tái hiện được giữ nguyên. Bài nộp có dữ liệu, test script, HTML report đa trình duyệt, ghi chú con người rà soát, bằng chứng commit và Agent Skill có thể tái sử dụng đã được xác thực.
