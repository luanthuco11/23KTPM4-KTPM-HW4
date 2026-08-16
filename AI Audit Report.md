# BÁO CÁO KIỂM TOÁN AI

## Tuyên bố

**Em sử dụng công cụ AI cho các công việc sau:** diễn giải yêu cầu HW04, xác định ba chức năng đã chọn trong HW02, chuyển SUT, lập kế hoạch, tạo và rà soát automation Playwright, phân tích failure, tạo report, soạn tài liệu và xây dựng Agent Skill.

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

- Prompt: `hãy chuyển mã nguồn từ git của đề bài vô folder này`
- Kết quả AI: Chuyển 66 file SUT được Git theo dõi từ repository giảng viên vào HW4, giữ nguyên `.git` hiện tại và lưu README gốc thành `ESHOP_README.md`.
- Con người rà soát/thực hiện: Xác nhận remote hiện tại và giữ README của HW4.

### Tương tác 4 – khoảng 18:45–19:01 ngày 2026-08-14

- Prompt: `Hãy xay dựng agent skill cho bài này`.
- Kết quả AI: Đề xuất thứ tự cài đặt, cấu hình Playwright cho ba trình duyệt, thêm metadata report, tạo 12 test FR-01 theo data-driven, cài trình duyệt, chạy suite và commit kết quả.
- Con người rà soát/thực hiện: Cung cấp MSSV. Lượt chạy đầu phát hiện lỗi module do `import.meta`; logic đường dẫn được sửa thành `process.cwd()`.
- Bằng chứng: commit `4d4fdd2`; `reports/fr01`.

### Tương tác 5 – 19:29–19:34 ngày 2026-08-14

- Prompt: `Hãy làm yêu cầu bài này từ file skill tôi đã cung cấp và sử dụng chúng trên cả ba chức năng tôi đã test trên HW2`
- Kết quả AI: AI bắt đầu quá trình làm bài trên cả 3 chức năng đã được cung cấp, và xuất ra những file cần thiết cho bài làm.

### Tương tác 6 – ngày 2026-08-16

- Prompt: yêu cầu Việt hóa Agent Skill, tách hai kịch bản video và áp dụng skill để đánh giá FR-11.
- Kết quả AI: Việt hóa skill cùng validator, viết hai kịch bản video, chạy lại FR-11 trên ba trình duyệt và xác nhận 42 lượt thành công, 3 lượt thất bại do cùng lỗi định dạng tiền.
- Con người rà soát/thực hiện: Thực hiện video Task 2 và video Agent Skill bằng lời thuyết minh tiếng Việt; cung cấp hai URL YouTube Unlisted.

### Tương tác 7 – ngày 2026-08-16

- Prompt: cung cấp URL video, yêu cầu tự đánh giá tối đa và đóng gói đúng nội dung đề bài.
- Kết quả AI: Cập nhật report/README, tự đánh giá 100/100, xuất lại PDF, commit, push và tạo ZIP tối giản không chứa source code nhưng có đầy đủ tài liệu, HTML report, bằng chứng lỗi và Agent Skill.
- Con người rà soát/thực hiện: Xác nhận nội dung video và phạm vi ZIP cuối.
