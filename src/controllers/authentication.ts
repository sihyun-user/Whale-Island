import { RequestHandler } from 'express';
import axios from 'axios';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';
import { addUser } from '../models/userModel';

export const register: RequestHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const userRecord = await admin.auth().createUser({
    email,
    password
  });

  if (!userRecord.email || !userRecord.uid) {
    return AppError(errorState.MISSING_DATA, next);
  }

  await addUser({ uid: userRecord.uid, email: userRecord.email });

  AppSuccess({ res, message: '使用者註冊成功' });
});

export const login: RequestHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 呼叫 Firebase REST API，使用 Email/Password 進行登入，獲取 ID Token
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  );

  const { idToken } = response.data;

  AppSuccess({ res, data: { token: idToken }, message: '使用者登入成功' });
});

export const checkIfAuthenticated: RequestHandler = catchAsync(async (req, res, next) => {
  AppSuccess({ res, message: '驗證使用者身份已登入' });
});
