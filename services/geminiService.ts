import { queryPolicyDatabase } from './mockDatabase';
import { renderTemplate } from './templateService';
import { classifyIntent, chooseModelByConfidence } from './intentService';

// Simple mock implementation to satisfy the build and basic functionality
export const sendMessageToGemini = async (message: string): Promise<string> => {
  console.log("Sending message to Gemini:", message);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  const intentMatch = classifyIntent(message);
  const modelChosen = chooseModelByConfidence(intentMatch);

  // Optional: try to hydrate policy context if用户输入包含保单号
  let policy = null;
  try {
    const match = message.match(/POL-[0-9A-Z]+/i);
    if (match) {
      policy = await queryPolicyDatabase(match[0]);
    }
  } catch (e) {
    console.warn('Policy lookup failed, fallback to generic reply', e);
  }

  const baseReply = `模型: ${modelChosen}${intentMatch.usedFallback ? '（低置信度，使用备用模型）' : ''}。意图: ${intentMatch.name}，置信度: ${(intentMatch.confidence * 100).toFixed(0)}%。${policy ? '已为您查询到保单概要，请核对。' : '如需保单查询，请提供保单号（如 POL-8888）。'}`;

  return renderTemplate('genericReply', {
    policy,
    userMessage: message,
    reply: baseReply,
  });
};
