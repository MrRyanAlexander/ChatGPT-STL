
export const validateInput = (input: string): boolean => {
  return input.trim().length > 0;
};

export const sanitizeInput = (input: string): string => {
  return input.trim();
};

export const isValidChatId = (chatId: string): boolean => {
  return /^[a-zA-Z0-9-_]+$/.test(chatId);
};
