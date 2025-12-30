import { INTENT_CONFIG } from '../config/intents';
import { IntentMatch } from '../types';

const PRIMARY_MODEL = import.meta.env.VITE_PRIMARY_MODEL || 'gemini-2.5-flash';
const FALLBACK_MODEL = import.meta.env.VITE_FALLBACK_MODEL || 'gemini-1.5-flash';

export const classifyIntent = (text: string): IntentMatch => {
  const lower = text.toLowerCase();
  let bestMatch: IntentMatch = {
    id: 'unknown',
    name: '未识别',
    confidence: 0.2,
    matchedKeywords: [],
    modelToUse: FALLBACK_MODEL,
    usedFallback: true,
  };

  INTENT_CONFIG.forEach((intent) => {
    const hits = intent.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
    if (hits.length) {
      const confidence = Math.min(1, 0.35 + hits.length * 0.15);
      if (confidence > bestMatch.confidence) {
        bestMatch = {
          id: intent.id,
          name: intent.name,
          confidence,
          matchedKeywords: hits,
          modelToUse: confidence >= intent.threshold ? PRIMARY_MODEL : FALLBACK_MODEL,
          usedFallback: confidence < intent.threshold,
        };
      }
    }
  });

  return bestMatch;
};

export const chooseModelByConfidence = (intentMatch: IntentMatch) => {
  return intentMatch.modelToUse || (intentMatch.usedFallback ? FALLBACK_MODEL : PRIMARY_MODEL);
};
