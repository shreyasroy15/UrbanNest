/**
 * Formats a number as Indian Rupees currency (e.g., ₹899).
 * @param {number} value
 * @returns {string}
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Limit string content length with trailing ellipsis.
 * @param {string} text
 * @param {number} limit
 * @returns {string}
 */
export const truncateText = (text, limit = 100) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit)}...`;
};
