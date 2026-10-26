import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildCliApp } from '../src/cli-app';
import { KbApiClient } from '../src/kb-client';
import { TicketRepository } from '../src/ticket-repository';

describe('CLI Integration Tests', () => {
  let kbClient: KbApiClient;
  let repo: TicketRepository;
  let logSpy: any;

  beforeEach(() => {
    kbClient = new KbApiClient('https://api.kb.example.com');
    repo = new TicketRepository('/virtual/path.json');
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('lệnh "create" thêm ticket và log ra thông báo thành công', async () => {
    vi.spyOn(repo, 'save').mockResolvedValueOnce(undefined);

    const program = buildCliApp(kbClient, repo);
    await program.parseAsync(['node', 'cli', 'create', '-t', 'Fix login bug']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Tạo ticket thành công: [Fix login bug]')
    );
  });

  it('lệnh "list" in ra danh sách tickets', async () => {
    vi.spyOn(repo, 'getAll').mockResolvedValueOnce([
      {
        id: '123',
        title: 'Task A',
        status: 'OPEN',
        priority: 'HIGH',
        createdAt: '2026-01-01',
      },
    ]);

    const program = buildCliApp(kbClient, repo);
    await program.parseAsync(['node', 'cli', 'list']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[OPEN] (HIGH) - Task A'));
  });

  it('lệnh "search-kb" gọi KbApiClient và in kết quả', async () => {
    vi.spyOn(kbClient, 'searchArticles').mockResolvedValueOnce([
      { id: '1', title: 'Khắc phục lỗi mạng', url: 'https://kb/net' },
    ]);

    const program = buildCliApp(kbClient, repo);
    await program.parseAsync(['node', 'cli', 'search-kb', 'mạng']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Khắc phục lỗi mạng'));
  });
});