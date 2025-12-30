import { RISK_WORDS, STATIC_QA } from '../constants';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import * as Sentry from '@sentry/browser';

let dynamicRiskWords: string[] = [...RISK_WORDS];
const RATE_LIMIT_POINTS = 8;
const RATE_LIMIT_DURATION = 30; // seconds
const messageRateLimiter = new RateLimiterMemory({
  points: RATE_LIMIT_POINTS,
  duration: RATE_LIMIT_DURATION,
});

export const loadRiskWordsRemote = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load risk words: ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      dynamicRiskWords = data.map((w) => String(w).toLowerCase());
    }
    return dynamicRiskWords;
  } catch (err) {
    Sentry.captureException(err);
    return dynamicRiskWords;
  }
};

export const containsRiskContent = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return dynamicRiskWords.some(word => lowerText.includes(word));
};

export const getStaticAnswer = (text: string): string | null => {
  const lowerText = text.toLowerCase();
  for (const [key, answer] of Object.entries(STATIC_QA)) {
    if (lowerText.includes(key)) {
      return answer;
    }
  }
  return null;
};

export const ensureWithinRateLimit = async (userId: string) => {
  try {
    await messageRateLimiter.consume(userId);
    return true;
  } catch (rateErr: any) {
    Sentry.captureMessage('Rate limit triggered', {
      level: 'warning',
      extra: { userId, remainingPoints: rateErr?.remainingPoints },
    });
    return false;
  }
};
