# PHÊ BÌNH VIỆC SỬ DỤNG AI

AI giúp tăng tốc việc dựng cấu trúc Playwright, chuyển test case thủ công sang data-driven và gợi ý các mẫu tái sử dụng như Page Object hoặc chuẩn bị dữ liệu qua API.

Vấn đề rõ nhất xuất hiện ở chức năng đăng ký. AI dùng mật khẩu hợp lệ theo đặc tả cho mọi test email. SUT lại có regex sai, yêu cầu khoảng trắng thay cho ký tự đặc biệt, nên bước kiểm tra mật khẩu chặn request trước khi hành vi email được thực thi. Test có thể fail nhưng không đúng nguyên nhân. Con người phải cô lập từng biến và chọn dữ liệu có chủ đích để vượt qua cổng kiểm tra sai khi đánh giá email.

AI cũng đánh giá thấp trạng thái dùng chung giữa ba browser project. Các lượt chạy có thể tạo trùng người dùng, đơn hàng hoặc danh mục. Sau khi rà soát, dữ liệu duy nhất theo worker được bổ sung, điều kiện trước được tạo qua API, fixed wait được thay bằng chờ response và negative test được tăng độ chặt bằng assertion chính xác HTTP status. Đường dẫn JSON dùng `import.meta` cũng phải đổi sang thư mục làm việc để phù hợp cấu hình module thực tế.

Bài học quan trọng là automation do AI tạo chỉ nên được xem như bản nháp. Một script hợp lý về hình thức chưa chắc là test đúng. Con người phải kiểm tra assertion có quan sát đúng hành vi, test có thể pass hoặc fail vì nguyên nhân ngoài mục tiêu, và kết quả có ổn định khi chạy lặp lại hay không.
