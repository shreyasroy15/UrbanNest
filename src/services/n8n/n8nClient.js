import axios from 'axios';

/**
 * Standard utility to post data to N8N webhook endpoints.
 * @param {string} url - Target N8N URL
 * @param {object} payload - JavaScript object to send as JSON
 * @returns {Promise<any>}
 */
export const postToN8n = async (url, payload) => {
  if (!url) {
    throw new Error('N8N_URL_MISSING');
  }

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
      },
      timeout: 15000, // 15s timeout
    });
    return response.data;
  } catch (error) {
    console.error('N8N API client error:', error.message);
    throw error;
  }
};
