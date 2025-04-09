import { RequestHandler } from 'express';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';
import { Book } from '../types/book';
import { AuthUser } from '../types/authentication';

const db = admin.firestore();

export const createBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;
  const { title, description, category, status, ageClassify, coverImage } = req.body;

  const params: Book = {
    id: null,
    authorId: uid,
    title,
    description,
    subscribers: [],
    category: category ?? [],
    status: status ?? 'draft',
    ageClassify: ageClassify ?? 'g',
    coverImage: coverImage ?? '',
    chapters: [],
    updatedAt: Date.now(),
    createdAt: Date.now()
  };

  // 獲取 document ID 並更新資料
  const bookRef = await db.collection('books').add(params);
  const bookId = bookRef.id;
  await bookRef.update({ id: bookId });

  AppSuccess({ res, message: '作品建立成功' });
});

export const getBooks: RequestHandler = catchAsync(async (req, res, next) => {
  const bookRecords = await db.collection('books').get();

  const books: Book[] = bookRecords.docs.map((doc) => doc.data() as Book);

  const authorIds = [...new Set(books.map((book) => book.authorId))]; // 去重複

  const userRecord = await db.collection('users').where('uid', 'in', authorIds).get();

  // 將查詢到的使用者資料轉換成以 uid 為鍵的物件 usersMap
  const usersMap: Record<string, AuthUser> = Object.fromEntries(
    userRecord.docs.map((doc) => {
      const { uid, username, avatar } = doc.data() as AuthUser;
      return [uid, { uid, username, avatar }];
    })
  );

  const data = books.map((book) => ({
    ...book,
    author: usersMap[book.authorId] ?? null
  }));

  AppSuccess({ res, data, message: '作品列表取得成功' });
});

export const getBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { id: bookId } = req.params;

  const bookRecord = await db.collection('books').doc(bookId).get();

  if (!bookRecord.exists) {
    return AppError(errorState.BOOK_NOT_FOUND, next); // 若找不到書籍，返回錯誤
  }

  const book = bookRecord.data() as Book;

  const userRecord = await db.collection('users').doc(book.authorId).get();

  const author = userRecord.exists
    ? ({
        uid: userRecord.id,
        username: userRecord.data()?.username ?? '',
        avatar: userRecord.data()?.avatar ?? ''
      } as AuthUser)
    : null;

  AppSuccess({ res, data: { ...book, author }, message: '作品取得成功' });
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
