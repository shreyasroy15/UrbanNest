// Centralized configuration for external N8N integrations
const queryWebhookUrl = import.meta.env.VITE_N8N_QUERY_WEBHOOK_URL || '';
const chatbotUrl = import.meta.env.VITE_N8N_CHATBOT_URL || '';

export const apiConfig = {
  n8n: {
    queryWebhookUrl: queryWebhookUrl.trim(),
    chatbotUrl: chatbotUrl.trim(),
    isQueryAvailable: !!queryWebhookUrl.trim(),
    isChatbotAvailable: !!chatbotUrl.trim(),
  }
};

export default apiConfig;
