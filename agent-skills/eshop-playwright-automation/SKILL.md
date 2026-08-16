---
name: eshop-playwright-automation
description: Xây dựng, rà soát, thực thi và bảo trì kiểm thử Playwright theo hướng dữ liệu cho các chức năng web của EShop. Sử dụng khi chuyển test case thủ công thành dữ liệu JSON/CSV bên ngoài, Page Object, test đa trình duyệt và HTML report có bằng chứng; hoặc khi rà soát test do AI tạo để tìm assertion yếu, selector dễ hỏng, cách chờ không ổn định, trường hợp biên bị thiếu và lỗi thật của hệ thống.
---

# Tự động hóa kiểm thử Playwright cho EShop

Tạo kiểm thử Playwright có thể tái hiện và luôn phân biệt lỗi của mã kiểm thử với lỗi của hệ thống EShop.

## Quy trình

1. Đọc yêu cầu chức năng, test case thủ công hiện có, thành phần giao diện liên quan và endpoint backend.
2. Xác định ít nhất 12 test case đơn mục tiêu, bao phủ trường hợp hợp lệ, không hợp lệ, giá trị biên, phân quyền và trạng thái khi phù hợp.
3. Lưu toàn bộ dữ liệu đầu vào và kết quả mong đợi trong JSON hoặc CSV. Không khai báo mảng test case trực tiếp trong file spec.
4. Chạy `node scripts/validate-test-data.mjs <các file dữ liệu>` để phát hiện bộ dữ liệu thiếu test case, thiếu ID hoặc trùng ID.
5. Tạo Page Object với locator theo role, label, placeholder hoặc test-id. Chỉ dùng CSS có giới hạn phạm vi khi hệ thống không có thuộc tính truy cập phù hợp.
6. Tạo dữ liệu kiểm thử duy nhất cho từng trình duyệt và worker. Ưu tiên dùng API công khai để chuẩn bị điều kiện trước; không sửa mã sản phẩm chỉ để làm test thành công.
7. Sử dụng ít nhất ba dạng assertion trong mỗi chức năng, bao gồm assertion về kết quả nghiệp vụ thay vì chỉ kiểm tra phần tử hiển thị.
8. Chạy chức năng trên Chromium, Firefox và WebKit. Cấu hình lưu ảnh chụp màn hình, video và trace cho test thất bại.
9. Đặt `Run by: <MSSV>` và thời gian ISO trong metadata của report. Xác minh report đã tạo chứa đủ hai giá trị.
10. Rà soát mọi test thất bại. Chạy lại trên các trình duyệt, kiểm tra trace và phân loại thành lỗi test, lỗi môi trường hoặc lỗi của hệ thống.
11. Chỉ sửa lỗi của mã kiểm thử. Giữ assertion đúng với yêu cầu khi phát hiện lỗi hệ thống có thể tái hiện ổn định.
12. Lưu trữ HTML report và đính kèm bằng chứng rõ ràng vào báo cáo lỗi Markdown cùng GitHub Issue.

## Quy tắc con người rà soát

- Thay selector dựa trên vị trí khi có selector ngữ nghĩa ổn định hơn.
- Thay thời gian chờ cố định bằng cách chờ theo điều kiện hoặc sự kiện thực tế.
- Tránh assertion có thể thành công sai lý do, đặc biệt khi một dữ liệu không hợp lệ khác đã chặn luồng trước đó.
- Giữ bước chuẩn bị và kết quả mong đợi có tính xác định qua nhiều lần chạy.
- Khôi phục hoặc cô lập dữ liệu demo bị thay đổi sau khi thực thi.
- Ghi lại prompt, kết quả AI, phần con người chỉnh sửa và lý do chỉnh sửa trong AI Audit Report.

Đọc [checklist rà soát](references/review-checklist.md) trước khi hoàn tất một chức năng hoặc report.

## Điều kiện hoàn thành

Không đánh dấu chức năng hoàn thành cho đến khi có dữ liệu tách riêng, ít nhất 12 test case có ID duy nhất, ba dạng assertion, kết quả chạy trên ba trình duyệt, metadata report đã được xác minh, ghi chú rà soát của con người và bằng chứng cho mọi lỗi hệ thống thực sự.
