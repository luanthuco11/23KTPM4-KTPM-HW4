# BÁO CÁO KIỂM TOÁN AI

## Tuyên bố

**Tôi sử dụng công cụ AI cho các công việc sau:** diễn giải yêu cầu HW04, xác định ba chức năng đã chọn trong HW02, chuyển SUT, lập kế hoạch, tạo và rà soát automation Playwright, phân tích failure, tạo report, soạn tài liệu và xây dựng Agent Skill.

- Công cụ AI: **OpenAI Codex (họ mô hình GPT-5)**
- Thời gian làm việc: **2026-08-14 đến 2026-08-16**
- Múi giờ: **Asia/Saigon (UTC+07:00)**

## Nhật ký tương tác

### Tương tác 1 – 18:30–18:39 ngày 2026-08-14

- Prompt: `Hãy đọc file 2026.HW04.Automation Testing_En, dịch sang tiếng việt và giải thích cho tôi phải làm những gì`
- Kết quả AI: Trích xuất tám trang PDF, dịch yêu cầu và lập checklist gồm ba chức năng, tối thiểu 36 test case, ba trình duyệt, tám commit test script, report, video, audit, critique và Agent Skill.
- Con người rà soát/thực hiện: Xác nhận HW04 dùng lại các chức năng nhóm A–C của HW02 và loại nhóm D.

### Tương tác 2 – khoảng 18:39 ngày 2026-08-14

- Prompt: `hãy đọc HW2 để biết tôi đã làm những chức năng nào`
- Kết quả AI: Đọc Main Report HW02, xác định FR-01, FR-11, FR-14 và chức năng mobile bị loại.
- Con người rà soát/thực hiện: Chọn FR-01, FR-11 và FR-14 cho HW04.

### Tương tác 3 – khoảng 18:40–18:45 ngày 2026-08-14

- Prompt: `hãy chuyển`
- Kết quả AI: Chuyển 66 file SUT được Git theo dõi từ repository giảng viên vào HW4, giữ nguyên `.git` hiện tại và lưu README gốc thành `ESHOP_README.md`.
- Con người rà soát/thực hiện: Xác nhận remote hiện tại và giữ README của HW4.

### Tương tác 4 – khoảng 18:45–19:01 ngày 2026-08-14

- Prompt: `Giờ tôi cần làm gì tiếp theo`, sau đó cung cấp MSSV `23127414` và yêu cầu `làm đi`.
- Kết quả AI: Đề xuất thứ tự cài đặt, cấu hình Playwright cho ba trình duyệt, thêm metadata report, tạo 12 test FR-01 theo data-driven, cài trình duyệt, chạy suite và commit kết quả.
- Con người rà soát/thực hiện: Cung cấp MSSV. Lượt chạy đầu phát hiện lỗi module do `import.meta`; logic đường dẫn được sửa thành `process.cwd()`.
- Bằng chứng: commit `4d4fdd2`; `reports/fr01`.

### Tương tác 5 – 19:29–19:34 ngày 2026-08-14

- Prompt: `làm tiếp đi`
- Kết quả AI: Cài đặt 15 test case FR-11 với API fixture duy nhất, chuyển trạng thái, assertion quyền sở hữu, Page Object và bằng chứng đa trình duyệt.
- Con người rà soát/thực hiện: Giữ assertion định dạng tiền Việt Nam đúng yêu cầu sau khi cả ba trình duyệt đều hiển thị dấu phẩy.
- Bằng chứng: commit `570603f`, `bc0b6c8`, `57297df`; `reports/fr11`.

### Tương tác 6 – 19:36–19:40 ngày 2026-08-14

- Prompt: tiếp tục yêu cầu `làm tiếp đi`.
- Kết quả AI: Cài đặt 12 test case FR-14, bao phủ tạo, hiển thị, xóa, validation, authorization và giá trị biên; giữ lại failure SUT nhất quán.
- Con người rà soát/thực hiện: Tăng độ chặt của negative test bằng assertion HTTP 400/403/404/409 và dùng fixture kiểm soát cho biên giao diện 0/1.
- Bằng chứng: commit `b94db66`, `fb04aed`, `73faecf`; `reports/fr14`.

### Tương tác 7 – 19:41–19:43 ngày 2026-08-14

- Prompt: tiếp tục yêu cầu automation.
- Kết quả AI: Thêm điều kiện tối thiểu 12 ID duy nhất cho mỗi chức năng, lưu report FR-01 và tạo commit test thứ tám được tính.
- Con người rà soát/thực hiện: Xác minh 39 test case duy nhất, 117 lượt thực thi, metadata report và trạng thái cơ sở dữ liệu/worktree.
- Bằng chứng: commit `d913bfa`.

### Tương tác 8 – sau 19:43 ngày 2026-08-14

- Prompt: `Làm đi, cái nào bạn ko làm được thì để lại`
- Kết quả AI: Tạo Main Report, Bug Report, nội dung Issue, AI Audit Report, AI Critique, README, Git log, checklist, screenshot bằng chứng, PDF và Agent Skill có thể tái sử dụng.
- Con người rà soát/thực hiện: Đăng nhập GitHub, cho phép tạo chín Issues và tự quay hai video thật.

### Tương tác 9 – ngày 2026-08-16

- Prompt: yêu cầu Việt hóa Agent Skill, tách hai kịch bản video và áp dụng skill để đánh giá FR-11.
- Kết quả AI: Việt hóa skill cùng validator, viết hai kịch bản video, chạy lại FR-11 trên ba trình duyệt và xác nhận 42 lượt thành công, 3 lượt thất bại do cùng lỗi định dạng tiền.
- Con người rà soát/thực hiện: Thực hiện video Task 2 và video Agent Skill bằng lời thuyết minh tiếng Việt; cung cấp hai URL YouTube Unlisted.

### Tương tác 10 – ngày 2026-08-16

- Prompt: cung cấp URL video, yêu cầu tự đánh giá tối đa và đóng gói đúng nội dung đề bài.
- Kết quả AI: Cập nhật report/README, tự đánh giá 100/100, xuất lại PDF, commit, push và tạo ZIP tối giản không chứa source code nhưng có đầy đủ tài liệu, HTML report, bằng chứng lỗi và Agent Skill.
- Con người rà soát/thực hiện: Xác nhận nội dung video và phạm vi ZIP cuối.

## Tóm tắt rà soát

Nội dung do AI tạo không được chấp nhận nguyên trạng. Các phần đã sửa gồm cách nạp đường dẫn, phạm vi locator, cô lập dữ liệu, chờ theo response, chuẩn bị điều kiện trước qua API, assertion chính xác HTTP status, fixture biên có kiểm soát, khôi phục cơ sở dữ liệu và giữ assertion theo yêu cầu khi phát hiện lỗi SUT có thể tái hiện.

Cuộc hội thoại Codex gốc là bản ghi tương tác đầy đủ có thẩm quyền. Phụ lục này tóm tắt các tương tác quan trọng và liên kết chúng với file cùng commit tương ứng.
