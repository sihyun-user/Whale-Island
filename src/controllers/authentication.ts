import { RequestHandler } from 'express';
import axios from 'axios';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';
import { User } from '../types/authentication';
import { generateRandomId } from '../helpers/index';

const db = admin.firestore();

export const register: RequestHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { uid } = await admin.auth().createUser({ email, password });

  const params: User = {
    uid,
    email,
    username: generateRandomId(),
    avatar: '',
    description: '',
    followers: [],
    following: [],
    createdAt: Date.now()
  };

  await db.collection('users').doc(uid).set(params);

  AppSuccess({ res, message: '使用者註冊成功' });
});

export const thirdPartyRegister: RequestHandler = catchAsync(async (req, res, next) => {
  const { idToken } = req.body;

  const { uid } = await admin.auth().verifyIdToken(idToken);

  const userDoc = await db.collection('users').doc(uid).get();

  if (!userDoc.exists) {
    const userRecord = await admin.auth().getUser(uid);

    const { email, photoURL } = userRecord;

    await db
      .collection('users')
      .doc(uid)
      .set({
        uid,
        email,
        username: generateRandomId(),
        avatar: photoURL,
        description: '',
        followers: [],
        following: [],
        createdAt: Date.now()
      } as User);

    AppSuccess({ res, message: '使用者第三方註冊成功' });
  }

  AppSuccess({ res, message: '使用者第三方已註冊' });
});

export const getAuthIdToken: RequestHandler = catchAsync(async (req, res, next) => {
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

export const getUserInfo: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;

  const userDoc = await db.collection('users').doc(uid).get();

  if (!userDoc.exists) {
    return AppError(errorState.USER_NOT_FOUND, next);
  }

  const user = userDoc.data() as User;

  AppSuccess({ res, data: user, message: '使用者資訊取得成功' });
});

export const updateUserInfo: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;
  const { username, avatar, description } = req.body;

  const userDoc = await db.collection('users').doc(uid).get();

  if (!userDoc.exists) {
    return AppError(errorState.USER_NOT_FOUND, next);
  }

  await db.collection('users').doc(uid).update({ username, avatar, description });

  AppSuccess({ res, message: '使用者資訊更新成功' });
});
