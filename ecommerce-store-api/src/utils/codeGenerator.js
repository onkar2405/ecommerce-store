/**
 * Generates a unique discount code.
 * @returns {string} A discount code string.
 */
exports.generateCode = () => {
  return "DISC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};
