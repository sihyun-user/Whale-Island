import { RequestHandler } from 'express';
import admin from '../connections';

export const register: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    res.status(201).json({
      message: '使用者註冊成功',
      user: userRecord
    });
  } catch (error: any) {
    console.error('註冊錯誤:', error);
    res.status(400).json({
      error: error.message || '註冊失敗'
    });
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.status(200).json({
      message: '登入成功',
      token: customToken
    });
  } catch (error: any) {
    console.error('登入錯誤:', error);
    res.status(400).json({
      error: error.message || '登入失敗'
    });
  }
};
