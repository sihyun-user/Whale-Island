import crypto from 'crypto';

export const generateRandomId = (): string => {
  return '島民' + crypto.randomBytes(5).toString('hex');
};
