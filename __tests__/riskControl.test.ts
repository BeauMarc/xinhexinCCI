jest.mock('rate-limiter-flexible');
jest.mock('@sentry/browser');

import { containsRiskContent, getStaticAnswer, ensureWithinRateLimit, loadRiskWordsRemote } from '../utils/riskControl';

describe('riskControl', () => {
  it('detects default risk words', () => {
    expect(containsRiskContent('This is an illegal request')).toBe(true);
    expect(containsRiskContent('safe topic')).toBe(false);
  });

  it('loads remote risk words and applies them', async () => {
    const mockFetch = jest.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => ['sensitive_word'],
    } as any);

    await loadRiskWordsRemote('https://example.com/risk');
    expect(containsRiskContent('contains sensitive_word now')).toBe(true);
    mockFetch.mockRestore();
  });

  it('returns static answers when keyword matches', () => {
    expect(getStaticAnswer('What is your hotline phone?')).toContain('400-800-8888');
  });

  it('enforces rate limit per user id', async () => {
    const userId = 'tester';
    for (let i = 0; i < 8; i++) {
      // within limit
      // eslint-disable-next-line no-await-in-loop
      expect(await ensureWithinRateLimit(userId)).toBe(true);
    }
    // next hit should be limited
    expect(await ensureWithinRateLimit(userId)).toBe(false);
  });
});
