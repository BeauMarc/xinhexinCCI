// Simple mock implementation to satisfy the build and basic functionality
export const sendMessageToGemini = async (message: string): Promise<string> => {
  // In a real implementation, this would call the Google Gemini API
  console.log("Sending message to Gemini:", message);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simple echo/mock response for the prototype
  return `I received your message: "${message}". As an AI assistant for the Large Group Commercial Insurance System, I can help you with policy queries and risk assessment. (API integration pending)`;
};