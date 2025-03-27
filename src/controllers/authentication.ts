import { RequestHandler } from 'express';
import axios from 'axios';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import { updateUser, getUser } from '../models/userModel';

export const register: RequestHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { uid } = await admin.auth().createUser({ email, password });

  await updateUser({ uid, email });

  AppSuccess({ res, message: '使用者註冊成功' });
});

export const login: RequestHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

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

export const thirdPartyLogin: RequestHandler = catchAsync(async (req, res, next) => {
  const { idToken } = req.body;

  const { uid } = await admin.auth().verifyIdToken(idToken);

  const userDoc = await getUser(uid);

  if (!userDoc.exists) {
    const userRecord = await admin.auth().getUser(uid);

    const { email, displayName, photoURL } = userRecord;

    await updateUser({ uid, email, username: displayName, avatar: photoURL });

    AppSuccess({ res, data: { token: idToken }, message: '使用者第三方註冊成功' });
  }

  AppSuccess({ res, data: { token: idToken }, message: '使用者第三方登入成功' });
});

export const checkIfAuthenticated: RequestHandler = catchAsync(async (req, res, next) => {
  AppSuccess({ res, message: '驗證使用者身份已登入' });
});
