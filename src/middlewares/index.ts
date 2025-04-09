import { RequestHandler } from 'express';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';

export const isAuthenticated: RequestHandler = catchAsync(async (req: any, res, next) => {
  // 提取 Bearer Token
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }

  // 檢查是否有 authToken
  const { authToken } = req;

  if (!authToken) {
    return AppError(errorState.AUTHENTICATION_FAILED, next);
  }

  // 使用 firebase 驗證 idToken
  const userInfo = await admin.auth().verifyIdToken(authToken);

  // 檢查該用戶是否存在，防止已刪除帳戶的 token 被接受
  const userRecord = await admin.auth().getUser(userInfo.uid);

  if (!userRecord) {
    return AppError(errorState.USER_NOT_FOUND, next);
  }

  req.uid = userInfo.uid;
  next();
});
