import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import errorState from '../helpers/errorState';
import AppError from '../helpers/appError';

const validate = (schema: ZodSchema): RequestHandler => {
  return async (req: any, res: any, next: any) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) {
        req.body = result.data;
        next();
      } else {
        const message = result.error.errors[0].message || '資料驗證錯誤';
        AppError({ statusCode: 400, message }, next);
      }
    } catch (error) {
      AppError(errorState.DEFAULT, next);
    }
  };
};

export default validate;
