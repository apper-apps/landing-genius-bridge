/**
 * Utility functions for the application
 */

/**
 * Generate a random delay for simulating API response times
 * @param {number} min - Minimum delay in milliseconds (default: 300)
 * @param {number} max - Maximum delay in milliseconds (default: 1000)
 * @returns {Promise<void>} Promise that resolves after the random delay
 */
export const getRandomDelay = (min = 300, max = 1000) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Format currency to Indonesian Rupiah
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a random ID
 * @returns {string} Random ID string
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce  
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};