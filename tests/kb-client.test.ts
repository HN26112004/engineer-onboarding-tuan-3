import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { KbApiClient } from '../src/kb-client';

describe('KbApiClient', () => {
  const BASE_URL = 'https://api.kb.example.com';
  let client: KbApiClient;

  beforeEach(() => {
    client = new KbApiClient(BASE_URL);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gửi request GET tìm kiếm bài viết và parse JSON thành công', async () => {
    const mockArticles = [
      { id: 'art-1', title: 'Hướng dẫn sửa lỗi đăng nhập', url: 'https://kb/1' },
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockArticles,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await client.searchArticles('login');

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/articles?query=login`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(result).toEqual(mockArticles);
  });

  it('ném ra lỗi cụ thể nếu API trả về mã lỗi 404 hoặc 500', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(client.searchArticles('unknown')).rejects.toThrowError(
      'KB API Error: 404 Not Found'
    );
  });
});