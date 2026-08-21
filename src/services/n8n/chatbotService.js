import { postToN8n } from './n8nClient';
import apiConfig from '../apiConfig';

/**
 * Sends a chatbot query user message to N8N webhook.
 * @param {object} param0
 * @param {string} param0.message
 * @param {string} param0.sessionId
 * @returns {Promise<any>}
 */
export const sendMessageToChatbot = async ({ message, sessionId }) => {
  const url = apiConfig.n8n.chatbotUrl;

  const payload = {
    message,
    chatInput: message, // Support both common naming variants in N8N chat templates
    sessionId,
    source: "urbannest-website",
    timestamp: new Date().toISOString()
  };

  if (!url) {
    throw new Error('N8N_URL_MISSING');
  }

  return await postToN8n(url, payload);
};
export default { sendMessageToChatbot };
