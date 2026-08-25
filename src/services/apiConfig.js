// Centralized configuration for external N8N integrations
const queryWebhookUrl = import.meta.env.VITE_N8N_QUERY_WEBHOOK_URL || 'https://shreyas0306.app.n8n.cloud/webhook/8e40a019-fbda-4ac0-84b1-94bbea2d5f78/chat';
const chatbotUrl = import.meta.env.VITE_N8N_CHATBOT_URL || 'https://shreyas0306.app.n8n.cloud/webhook/8e40a019-fbda-4ac0-84b1-94bbea2d5f78/chat';

export const apiConfig = {
  n8n: {
    queryWebhookUrl: queryWebhookUrl.trim(),
    chatbotUrl: chatbotUrl.trim(),
    isQueryAvailable: !!queryWebhookUrl.trim(),
    isChatbotAvailable: !!chatbotUrl.trim(),
  }
};

export default apiConfig;
