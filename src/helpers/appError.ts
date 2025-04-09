import { NextFunction } from 'express';

type ErrorState = {
  statusCode: number;
  code?: string;
  message: string;
};

export class HandleError extends Error {
  public errors?: { [key: string]: any };
  statusCode: number;
  code: string;
  isOperational: boolean;

  constructor(errInfo: ErrorState) {
    super(errInfo.message);
    this.code = errInfo.code || 'unknown';
    this.statusCode = errInfo.statusCode;
    this.isOperational = true;
  }
}

const AppError = (errorState: ErrorState, next: NextFunction) => {
  const error = new HandleError(errorState);
  next(error);
};

export default AppError;
