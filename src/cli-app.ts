// src/cli-app.ts
import { Command } from 'commander';
import { KbApiClient } from './kb-client';
import { TicketRepository } from './ticket-repository';
import { validateAndCreateTicket } from './ticket-service';

export function buildCliApp(kbClient: KbApiClient, repo: TicketRepository) {
  const program = new Command();

  program
    .name('ticket-cli')
    .description('CLI Tool - Ticket Manager & Knowledge Base Integration')
    .version('1.0.0');

  // Lệnh: list
  program
    .command('list')
    .description('Liệt kê toàn bộ ticket')
    .action(async () => {
      try {
        const tickets = await repo.getAll();
        if (tickets.length === 0) {
          console.log('Chưa có ticket nào.');
          return;
        }
        tickets.forEach((t) => {
          console.log(`[${t.status}] (${t.priority}) - ${t.title} [ID: ${t.id}]`);
        });
      } catch (err: any) {
        console.error('Lỗi khi lấy danh sách:', err.message);
      }
    });

  // Lệnh: create
  program
    .command('create')
    .description('Tạo ticket mới')
    .requiredOption('-t, --title <title>', 'Tiêu đề ticket')
    .option('-p, --priority <priority>', 'Mức độ ưu tiên (LOW, MEDIUM, HIGH)', 'MEDIUM')
    .action(async (options) => {
      try {
        const ticket = validateAndCreateTicket({
          title: options.title,
          priority: options.priority,
        });
        await repo.save(ticket);
        console.log(`Tạo ticket thành công: [${ticket.title}] (ID: ${ticket.id})`);
      } catch (err: any) {
        console.error('Lỗi khi tạo ticket:', err.message);
      }
    });

  // Lệnh: search-kb
  program
    .command('search-kb <keyword>')
    .description('Tìm kiếm bài viết giải pháp trên Knowledge Base')
    .action(async (keyword: string) => {
      try {
        const articles = await kbClient.searchArticles(keyword);
        if (articles.length === 0) {
          console.log('Không tìm thấy bài viết nào phù hợp.');
          return;
        }
        articles.forEach((art, index) => {
          console.log(`[${index + 1}] ${art.title} -> ${art.url}`);
        });
      } catch (err: any) {
        console.error('Lỗi khi tra cứu KB:', err.message);
      }
    });

  return program;
}