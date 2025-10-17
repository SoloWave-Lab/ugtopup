/**
 * Generates a short, memorable order ID
 * Format: PREFIX-XXXX (e.g., FF-A3X9, TT-K2M7)
 */
export const generateShortOrderId = (prefix: string): string => {
  // Remove ambiguous characters (0, O, 1, I, L)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  
  for (let i = 0; i < 4; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `${prefix}-${id}`;
};
