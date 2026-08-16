# Video 1 – Task 2: Demo chạy kiểm thử tự động

**Thời lượng mục tiêu:** 6–8 phút, không được ngắn hơn 5 phút.  
**Ngôn ngữ:** thuyết minh tiếng Việt.  
**Chế độ YouTube:** Không công khai (Unlisted).

Video này phải quay liên tục một lượt chạy FR-11 từ lúc bắt đầu đến khi có kết quả, thể hiện ba trình duyệt, mở HTML report và giải thích một vấn đề trong script do AI đề xuất cùng cách sửa.

## Chuẩn bị trước khi bấm quay

1. Mở Visual Studio Code tại thư mục `E:\HK3-2026\KTPM\HW4`.
2. Mở sẵn các file sau trong các tab:
   - `playwright.config.ts`
   - `tests/specs/fr11-order-history.spec.ts`
   - `tests/pages/order-history.page.ts`
   - `tests/data/order-history.json`
   - `frontend-web/src/pages/Profile.jsx`
3. Mở terminal tại thư mục gốc của HW4.
4. Không chỉnh sửa kết quả test hoặc cắt bỏ phần test thất bại.

## 0:00–0:40 – Giới thiệu và xác minh người thực hiện

### Thao tác trên màn hình

Mở terminal và chạy lần lượt:

```powershell
whoami
hostname
```

### Lời thoại

> Xin chào thầy/cô, em là sinh viên có mã số 23127414. Đây là video demo Task 2 của bài HW04 Automation Testing trên hệ thống EShop. Trước tiên, em chạy hai lệnh whoami và hostname để xác minh tài khoản người dùng và máy đang thực hiện bài. Trong video này, em sẽ chạy hoàn chỉnh bộ test FR-11, thể hiện việc chạy trên nhiều trình duyệt, mở HTML report và giải thích một chỗ em đã chỉnh sửa sau khi đánh giá mã do AI đề xuất.

Giữ kết quả `whoami` và `hostname` trên màn hình vài giây để người chấm đọc được.

## 0:40–1:20 – Giới thiệu script và cấu hình đa trình duyệt

### Thao tác trên màn hình

Mở `tests/specs/fr11-order-history.spec.ts`, sau đó mở phần `projects` trong `playwright.config.ts`.

### Lời thoại

> Em chọn script FR-11, kiểm thử chức năng xem lịch sử đơn hàng. Bộ dữ liệu của chức năng này có 15 test case và được đặt ngoài script trong file JSON. Playwright được cấu hình với ba project là Chromium, Firefox và WebKit. Vì vậy, 15 test case sẽ tạo thành tổng cộng 45 lượt thực thi trên ba trình duyệt.

Chỉ chuột lần lượt vào các cấu hình `chromium`, `firefox` và `webkit` trong `playwright.config.ts`.

> Cấu hình report cũng lưu ảnh chụp màn hình, video và trace khi test thất bại. Tiêu đề report chứa mã số sinh viên 23127414 và thời gian chạy theo định dạng ISO.

## 1:20–2:50 – Giải thích vấn đề trong mã AI và cách sửa

### Vấn đề 1: dữ liệu có thể bị dùng chung

Mở `tests/specs/fr11-order-history.spec.ts` và chỉ vào dòng tạo `uniqueValue`:

```ts
const uniqueValue =
  `${testInfo.project.name}-${Date.now()}-${testInfo.workerIndex}-${index}`;
```

### Lời thoại

> Khi đánh giá cách cài đặt ban đầu do AI đề xuất, em nhận thấy nếu các test sử dụng cùng một tài khoản hoặc cùng dữ liệu đơn hàng thì ba trình duyệt có thể tác động lẫn nhau. Một test có thể nhìn thấy dữ liệu được tạo bởi test khác, làm kết quả không ổn định hoặc thành công sai lý do.

> Em sửa bằng cách tạo một giá trị duy nhất từ tên trình duyệt, thời gian hiện tại, số thứ tự worker và vị trí test case. Giá trị này được truyền vào hàm createTestUser. Do đó mỗi test trên mỗi trình duyệt sử dụng người dùng và đơn hàng riêng.

Chỉ tiếp vào các dòng:

```ts
const userA = await createTestUser(request, `${uniqueValue}-a`);
const userB = await createTestUser(request, `${uniqueValue}-b`);
```

### Vấn đề 2: chờ bằng thời gian cố định

Mở `tests/pages/order-history.page.ts` và chỉ vào hàm `gotoAuthenticated`:

```ts
await Promise.all([
  this.page.waitForResponse((response) =>
    response.url().includes('/api/orders/my-orders'),
  ),
  this.page.goto('/profile'),
]);
```

### Lời thoại

> Vấn đề thứ hai là cách chờ một số giây cố định, ví dụ waitForTimeout 2000, có thể bị flaky. Nếu API phản hồi chậm hơn thì test kiểm tra giao diện quá sớm; nếu API phản hồi nhanh thì test vẫn lãng phí thời gian chờ.

> Em thay bằng waitForResponse để đợi đúng phản hồi của API my-orders. Promise.all đăng ký việc chờ response đồng thời với lúc mở trang profile, nên test chỉ tiếp tục sau khi dữ liệu đơn hàng thực sự được trả về. Trong mã hiện tại không còn lệnh chờ thời gian cố định.

## 2:50–4:30 – Chạy script từ đầu đến cuối

### Thao tác trên màn hình

Quay lại terminal và chạy:

```powershell
npm run test:fr11
```

Không dừng lệnh và không chuyển sang report trước khi terminal in kết quả cuối cùng.

### Lời thoại trong lúc chờ

> Bây giờ em chạy script FR-11 từ đầu đến cuối. Lệnh này thực thi file fr11-order-history.spec.ts. Theo cấu hình vừa trình bày, cùng bộ test sẽ được chạy trên Chromium, Firefox và WebKit.

> Dữ liệu kiểm thử gồm trường hợp có nhiều đơn hàng, không có đơn hàng, chưa đăng nhập, cô lập dữ liệu giữa người dùng, các trạng thái đơn hàng, các giá trị biên và định dạng tiền tệ Việt Nam.

Khi tên ba project xuất hiện trên terminal, chỉ vào chúng và nói:

> Trên terminal có thể thấy tên project đặt trong dấu ngoặc vuông. Đây là bằng chứng các test đang chạy trên ba trình duyệt khác nhau.

Khi lệnh hoàn tất, giữ nguyên màn hình kết quả và nói:

> Script đã chạy hoàn chỉnh 45 lượt thực thi. Kết quả dự kiến của lần chạy này là 42 lượt thành công và 3 lượt thất bại. Ba lượt thất bại là cùng test định dạng tiền tệ trên ba trình duyệt và phản ánh một lỗi của hệ thống EShop.

Nếu thời gian chạy thực tế lâu hơn dự kiến, tiếp tục quay và thuyết minh; không cắt mất phần bắt đầu hoặc kết quả cuối.

## 4:30–6:00 – Mở và trình bày HTML report vừa tạo

### Thao tác trên màn hình

Chạy:

```powershell
npm run report
```

Lệnh này mở report vừa tạo tại `playwright-report/index.html`. Không dùng `reports/fr11/index.html` ở bước này vì đó là bản report lưu trữ từ lần chạy trước.

### Lời thoại

> Đây là HTML report được tạo trực tiếp từ lượt chạy vừa rồi. Trên tiêu đề có dòng Run by 23127414 và thời gian chạy theo định dạng ISO. Phần tổng quan thể hiện số test thành công, thất bại và thời gian thực thi.

Chọn một test `TC_ORD_10` bị thất bại trên một trình duyệt, mở phần chi tiết và nói:

> Em mở test TC_ORD_10 về định dạng tổng tiền. Report cho biết giá trị mong đợi là 1.250.000 đồng, nhưng giao diện hiển thị 1,250,000 đồng. Report giữ lại thông báo assertion, ảnh chụp màn hình, video và trace để hỗ trợ tái hiện lỗi.

Mở `tests/data/order-history.json` và chỉ vào:

```json
"totalAmount": 1250000,
"expectedAmount": "1.250.000 ₫"
```

Sau đó mở assertion trong `fr11-order-history.spec.ts`:

```ts
await expect(row.locator('td').nth(2)).toHaveText(
  testCase.expectedAmount!,
);
```

### Lời thoại

> Em giữ nguyên assertion này vì dấu chấm là dấu phân cách hàng nghìn theo định dạng Việt Nam. Em không đổi expected thành dấu phẩy chỉ để test chuyển sang trạng thái passed.

Mở `frontend-web/src/pages/Profile.jsx` và chỉ vào lệnh `toLocaleString()`:

> Nguyên nhân ở mã hệ thống là hàm toLocaleString được gọi mà không truyền locale vi-VN. Vì lỗi xuất hiện giống nhau trên cả ba trình duyệt nên em phân loại đây là lỗi của SUT, không phải lỗi của test script.

## 6:00–6:40 – Tổng kết Video 1

### Lời thoại

> Trong video này, em đã chạy một script từ đầu đến cuối, chứng minh script chạy trên Chromium, Firefox và WebKit, mở HTML report của chính lượt chạy đó, đồng thời giải thích vấn đề về dữ liệu dùng chung và cách chờ cố định trong phương án AI, cùng cách em sửa bằng dữ liệu duy nhất và chờ phản hồi API thực tế. Em cũng giải thích một test thất bại do lỗi định dạng tiền của hệ thống. Em xin kết thúc video Task 2. Em cảm ơn thầy/cô đã theo dõi.

## Sau khi quay Video 1

1. Kiểm tra video dài ít nhất 5 phút và có âm thanh tiếng Việt rõ ràng.
2. Kiểm tra hình ảnh có thể đọc được `whoami`, `hostname`, tên ba trình duyệt và kết quả report.
3. Tải video lên YouTube ở chế độ **Không công khai (Unlisted)**.
4. Lưu URL với tên `Task 2 video URL` để điền vào README và báo cáo.
