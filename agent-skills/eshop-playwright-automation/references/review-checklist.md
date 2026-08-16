# Checklist rà soát kiểm thử tự động

## Thiết kế kiểm thử

- Có ít nhất 12 test ID duy nhất cho mỗi chức năng.
- Bao phủ trường hợp hợp lệ, không hợp lệ, giá trị biên, phân quyền và trạng thái khi phù hợp.
- Mỗi test chỉ kiểm tra một hành vi và có kết quả mong đợi rõ ràng.
- Dùng dữ liệu JSON hoặc CSV bên ngoài; không khai báo tập test case trực tiếp trong file spec.

## Cài đặt

- Page Object tách thao tác giao diện khỏi assertion.
- Dữ liệu duy nhất ngăn xung đột giữa các trình duyệt và các lần chạy lặp lại.
- Điều kiện trước được chuẩn bị bằng hành vi UI hoặc API được hỗ trợ.
- Có ít nhất ba dạng assertion.
- Không dùng thời gian chờ cố định để đồng bộ với ứng dụng.

## Bằng chứng đa trình duyệt

- Chromium, Firefox và WebKit đều thực thi chức năng.
- HTML report chứa `Run by: <MSSV>` và thời gian ISO.
- Ảnh chụp màn hình, trace và video của test thất bại được giữ lại.
- Report được lưu trữ bên ngoài thư mục tạm thời `playwright-report`.

## Con người rà soát

- Xác minh selector không phụ thuộc vị trí khi không cần thiết.
- Xác minh assertion thất bại đúng nguyên nhân cần kiểm tra.
- Tái hiện ổn định các lỗi hệ thống thực sự.
- Giải thích AI đã bỏ sót điều gì và vì sao.
- Khôi phục cơ sở dữ liệu của hệ thống sau lượt chạy làm thay đổi dữ liệu.
- Ghi nhận lỗi trong Markdown và GitHub Issues.
