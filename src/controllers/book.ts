import { RequestHandler } from 'express';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import { Book } from '../types/book';

const db = admin.firestore();

export const createBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;
  const { title, description, category } = req.body;

  (await db.collection('books').add({
    title,
    description,
    author: uid,
    category,
    createdAt: new Date(),
    updatedAt: new Date()
  })) as Book;

  AppSuccess({ res, message: '作品建立成功' });
});

export const getBooks: RequestHandler = catchAsync(async (req, res, next) => {
  const books = await db.collection('books').get();

  const data = books.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  AppSuccess({ res, data, message: '作品列表取得成功' });
});
