import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      uid?: string;
      authToken?: string | null;
    }
  }
}

export {};
