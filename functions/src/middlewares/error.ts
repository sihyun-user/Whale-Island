import { NextFunction, Request, Response } from 'express';
import errorState from '../helpers/errorState';
import { HandleError } from '../helpers/appError';

const sendErrorProd = (err: HandleError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message
    });
  } else {
    console.error('出現系統錯誤', err);
    res.status(500).json({
      status: false,
      message: '系統錯誤，請洽系統管理員'
    });
  }
};

const sendErrorDev = (err: HandleError, res: Response) => {
  return res.status(err.statusCode).json({
    status: false,
    code: err.code,
    message: err.message,
    stack: err.stack
  });
};

const errHandle = (err: HandleError, req: Request, res: Response, next: NextFunction) => {
  const isDev = process.env.NODE_ENV === 'development';
  err.statusCode = err.statusCode || 500;

  // 使用 Firebase 錯誤對應表根據錯誤碼更新錯誤訊息與狀態碼
  const firebaseMapping = errorState[err.code as keyof typeof errorState];
  if (firebaseMapping) {
    err.statusCode = firebaseMapping.statusCode;
    err.message = firebaseMapping.message;
  } else {
    err.statusCode = err.statusCode || errorState.DEFAULT.statusCode;
    err.message = err.message || errorState.DEFAULT.message;
  }

  isDev ? sendErrorDev(err, res) : sendErrorProd(err, res);
};

export default errHandle;
