# HW04 – Kiểm thử tự động có hỗ trợ AI

**Mã số sinh viên:** 23127414

**Hệ thống được kiểm thử (SUT):** EShop

**Framework:** Playwright

**Trình duyệt:** Chromium, Firefox, WebKit

## Các chức năng được chọn

| Nhóm | Chức năng |
|---|---|
| A | FR-01 – Đăng ký tài khoản |
| B | FR-11 – Xem lịch sử đơn hàng |
| C | FR-14 – Quản lý danh mục |

## Tóm tắt kiểm thử

| Chức năng | Test case tự động | Lượt thực thi trên trình duyệt | Thành công | Thất bại |
|---|---:|---:|---:|---:|
| FR-01 | 12 | 36 | 12 | 24 |
| FR-11 | 15 | 45 | 42 | 3 |
| FR-14 | 12 | 36 | 18 | 18 |
| **Tổng cộng** | **39** | **117** | **72** | **45** |

- Số lượt chạy chức năng–trình duyệt: **9**
- Số lỗi khác nhau đã ghi nhận: **9**
- GitHub Issues: [#1–#9](https://github.com/luanthuco11/23KTPM4-KTPM-HW4/issues)
- Số commit thay đổi test script được tính: **8**
- Video demo Task 2: [YouTube – Không công khai](https://youtu.be/wVz2drOVd2E)
- Video demo Agent Skill: [YouTube – Không công khai](https://youtu.be/lPOh3j1v4oU)
- Repository công khai: <https://github.com/luanthuco11/23KTPM4-KTPM-HW4>

Các assertion thất bại vẫn được giữ lại khi chúng phát hiện ổn định một lỗi thật của SUT. Xem [Báo cáo lỗi](docs/Bug%20Report.md) và các HTML report đã lưu.

## Báo cáo và tài liệu

- [HTML report FR-01](reports/fr01/index.html)
- [HTML report FR-11](reports/fr11/index.html)
- [HTML report FR-14](reports/fr14/index.html)
- [Báo cáo chính](Main%20Report.md)
- [Báo cáo kiểm toán AI](AI%20Audit%20Report.md)
- [Bài phê bình AI](AI%20Critique.md)
- [Git Commit Log](Git%20Commit%20Log.txt)
- [Agent Skill](agent-skills/eshop-playwright-automation/SKILL.md)

## Chạy bộ kiểm thử tự động

```bash
npm install
npx playwright install chromium firefox webkit
npm run test:fr01
npm run test:fr11
npm run test:fr14
```

Playwright tự khởi động backend, storefront và trang quản trị khi các dịch vụ chưa chạy.

## Tự đánh giá

| STT | Tiêu chí | Điểm tối đa | Điểm tự đánh giá |
|---:|---|---:|---:|
| 1 | Task 1 – Chức năng A (FR-01) | 25 | 25 |
| 2 | Task 1 – Chức năng B (FR-11) | 25 | 25 |
| 3 | Task 1 – Chức năng C (FR-14) | 25 | 25 |
| 4 | Task 2 – Video demo | 15 | 15 |
| 5 | Agent Skill | 10 | 10 |
|  | **Tổng cộng** | **100** | **100** |

Tên file nộp bài: `23127414_HW04_AI_Automation_100.zip`.
