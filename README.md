# engineer-onboarding-tuan-3
# Ticket Manager CLI & KB Integration - Week 3

Công cụ dòng lệnh quản lý công việc và tích hợp hệ thống tri thức (Knowledge Base API) được phát triển theo phương pháp **Test-Driven Development (TDD)** kết hợp **Integration Testing**.

## Các tính năng chính
- **Quản lý Ticket:** Tạo mới (`create`) và hiển thị danh sách (`list`) lưu trữ qua tệp JSON cục bộ.
- **Tích hợp KB API:** Tra cứu giải pháp và bài viết hỗ trợ từ xa (`search-kb`) qua HTTP Client an toàn.
- **CLI chuyên nghiệp:** Phân tích tham số linh hoạt với `commander`.
- **Kiểm thử toàn diện:** Unit test và Integration test tự động bằng `vitest`, mock fetch API toàn cục và mock file system I/O.

## Cài đặt & Chạy kiểm thử

```powershell
# Cài đặt thư viện
npm install

# Chạy toàn bộ test suites (Unit & Integration Tests)
npm test

## Sử dụng CLI
# Xem trợ giúp các lệnh
npx tsx src/index.ts --help

# Tạo ticket mới
npx tsx src/index.ts create -t "Sửa lỗi kết nối mạng" -p HIGH

# Xem danh sách ticket
npx tsx src/index.ts list

# Tìm kiếm bài viết hỗ trợ trên Knowledge Base
npx tsx src/index.ts search-kb "kết nối mạng"