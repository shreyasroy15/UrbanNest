import { postToN8n } from './n8nClient';
import apiConfig from '../apiConfig';

/**
 * Submits the customer query form data to the N8N webhook.
 * @param {object} param0
 * @param {string} param0.name
 * @param {string} param0.email
 * @param {string} param0.phone
 * @param {string} param0.category
 * @param {string} param0.message
 * @returns {Promise<any>}
 */
export const submitQuery = async ({ name, email, phone, category, message }) => {
  const url = apiConfig.n8n.queryWebhookUrl;

  const payload = {
    source: "urbannest-website",
    customer: {
      name,
      email,
      phone
    },
    query: {
      category,
      message
    },
    metadata: {
      submittedAt: new Date().toISOString(),
      platform: "web"
    }
  };

  if (!url) {
    throw new Error('N8N_URL_MISSING');
  }

  return await postToN8n(url, payload);
};
export default { submitQuery };
