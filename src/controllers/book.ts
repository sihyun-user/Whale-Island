import { RequestHandler } from 'express';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';
import { Book } from '../types/book';

const db = admin.firestore();

export const createBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;
  const { title, description, category, status, ageClassify, coverImage } = req.body;

  const params: Book = {
    authorId: uid,
    title,
    description,
    subscribers: [],
    category: category ?? [],
    status: status ?? 'draft',
    ageClassify: ageClassify ?? 'g',
    coverImage: coverImage ?? '',
    updatedAt: Date.now(),
    createdAt: Date.now()
  };

  await db.collection('books').add(params);

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

export const getBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const book = await db.collection('books').doc(id).get();

  if (!book.exists) {
    return AppError(errorState.BOOK_NOT_FOUND, next);
  }

  AppSuccess({ res, data: book.data(), message: '作品取得成功' });
});

export const updateBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, category, status, ageClassify, coverImage } = req.body;

  const book = await db.collection('books').doc(id).get();

  if (!book.exists) {
    return AppError(errorState.BOOK_NOT_FOUND, next);
  }

  await db.collection('books').doc(id).update({
    title,
    description,
    category,
    status,
    ageClassify,
    coverImage,
    updatedAt: Date.now()
  });

  AppSuccess({ res, message: '作品資訊更新成功' });
});
