# Video 2 – Demo Agent Skill trên một chức năng hoàn chỉnh

**Chức năng demo:** FR-11 – Xem lịch sử đơn hàng.  
**Thời lượng mục tiêu:** 3–5 phút.  
**Mục tiêu:** trình diễn cách dùng skill từ lúc đưa yêu cầu đến khi agent kết luận kết quả kiểm thử.

## 0:00–0:25 – Giới thiệu

### Thao tác

Mở `agent-skills/eshop-playwright-automation/SKILL.md`.

### Lời nói

> Xin chào thầy/cô, em là sinh viên có mã số 23127414. Trong video này, em trình diễn cách sử dụng Agent Skill Tự động hóa Playwright cho EShop từ đầu đến cuối trên chức năng FR-11 xem lịch sử đơn hàng. Skill sẽ hướng dẫn agent kiểm tra dữ liệu, mã kiểm thử, chạy đa trình duyệt, đọc report và phân loại lỗi.

## 0:25–0:50 – Gọi skill

### Thao tác

Mở Codex tại repository HW4 và nhập nguyên prompt:

```text
Hãy đọc và áp dụng Agent Skill tại
agent-skills/eshop-playwright-automation/SKILL.md cho chức năng
FR-11 xem lịch sử đơn hàng.

Hãy thực hiện đầy đủ quy trình: kiểm tra dữ liệu JSON, rà soát
Page Object và test script, chạy FR-11 trên Chromium, Firefox và
WebKit, đọc HTML report, phân loại các test thất bại và kết luận
FR-11 có đạt điều kiện hoàn thành của skill hay không.
Không sửa mã hệ thống EShop.
```

### Lời nói

> Em chỉ cần chỉ định đường dẫn của skill, chức năng cần thực hiện và kết quả mong muốn. Agent sẽ đọc quy trình trong skill và tự thực hiện các bước theo đúng thứ tự.

## 0:50–1:35 – Agent kiểm tra dữ liệu và mã kiểm thử

### Thao tác

Cho thấy agent đọc các file của FR-11 và chạy validator. Khi terminal xuất hiện kết quả, giữ màn hình vài giây.

### Lời nói

> Đầu tiên, agent kiểm tra file dữ liệu order-history.json. Kết quả xác nhận có 15 test case và tất cả ID đều duy nhất, vượt yêu cầu tối thiểu 12 test case.

> Tiếp theo, agent rà soát Page Object và test script. Agent kiểm tra dữ liệu được tạo riêng cho từng trình duyệt, cách chờ sử dụng waitForResponse thay cho thời gian cố định, đồng thời kiểm tra các assertion về số đơn hàng, trạng thái và định dạng tiền tệ.

## 1:35–2:30 – Agent chạy kiểm thử đa trình duyệt

### Thao tác

Cho thấy agent chạy:

```powershell
npm run test:fr11
```

Giữ màn hình đến khi lệnh hoàn tất. Chỉ vào tên `chromium`, `firefox` và `webkit` trong kết quả.

### Lời nói

> Sau khi rà soát mã, agent chạy toàn bộ FR-11. Cùng 15 test case được thực thi trên Chromium, Firefox và WebKit, tạo thành 45 lượt chạy. Em chờ lệnh hoàn tất để skill có đủ bằng chứng thực tế trước khi kết luận.

> Kết quả có 42 lượt thành công và 3 lượt thất bại. Ba lượt thất bại đều thuộc test TC_ORD_10 trên ba trình duyệt.

## 2:30–3:20 – Agent đọc report và phân loại lỗi

### Thao tác

Cho thấy agent kiểm tra `playwright-report/index.html` hoặc mở report bằng:

```powershell
npm run report
```

Mở chi tiết `TC_ORD_10`.

### Lời nói

> Skill yêu cầu không tự động sửa assertion chỉ để test chuyển sang passed. Agent đọc report và xác định giá trị mong đợi là 1.250.000 đồng nhưng hệ thống hiển thị 1,250,000 đồng.

> Lỗi xuất hiện giống nhau trên cả ba trình duyệt. Mã giao diện gọi toLocaleString mà không truyền vi-VN, nên agent phân loại đây là lỗi thật của hệ thống EShop, không phải lỗi của test script.

## 3:20–3:50 – Kết luận

### Thao tác

Hiển thị phần tổng kết cuối cùng do agent trả về.

### Lời nói

> Agent kết luận FR-11 có dữ liệu tách riêng, 15 ID duy nhất, Page Object, nhiều dạng assertion, kết quả chạy ba trình duyệt, report có bằng chứng và lỗi hệ thống đã được ghi nhận. Vì vậy chức năng đạt điều kiện hoàn thành của skill dù vẫn có ba lượt thất bại do cùng một lỗi của SUT.

> Như vậy, em đã dùng Agent Skill từ lúc đưa yêu cầu, kiểm tra dữ liệu và mã, chạy test, đọc report, phân loại lỗi đến khi kết luận một chức năng hoàn chỉnh. Em xin kết thúc phần trình diễn.

## Sau khi quay

Tải video lên YouTube ở chế độ **Không công khai (Unlisted)** và lưu URL với tên `Agent Skill video URL`.
