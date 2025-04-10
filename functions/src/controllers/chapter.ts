import { RequestHandler } from 'express';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';
import { Book } from '../types/book';
import { Chapter } from '../types/chapter';

const db = admin.firestore();

export const createChapter: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;
  const { bookId, title, content, status } = req.body;

  const bookDoc = await db.collection('books').doc(bookId).get();

  if (!bookDoc.exists) {
    return AppError(errorState.BOOK_NOT_FOUND, next);
  }

  const bookData = bookDoc.data();

  if (bookData?.authorId !== uid) {
    return AppError(errorState.UNAUTHORIZED, next);
  }

  const params: Chapter = {
    id: null,
    title,
    content,
    status,
    likes: [],
    comments: [],
    updatedAt: Date.now(),
    createdAt: Date.now()
  };

  const chapterRef = await db.collection('chapters').add(params);
  const chapterId = chapterRef.id;
  await chapterRef.update({ id: chapterId });

  await db
    .collection('books')
    .doc(bookId)
    .update({
      chapters: admin.firestore.FieldValue.arrayUnion(chapterId)
    });

  AppSuccess({ res, message: '章節建立成功' });
});

export const getChapters: RequestHandler = catchAsync(async (req, res, next) => {
  const { id: bookId } = req.params;

  const bookDoc = await db.collection('books').doc(bookId).get();

  if (!bookDoc.exists) {
    return AppError(errorState.BOOK_NOT_FOUND, next);
  }

  const bookData = bookDoc.data() as Book;

  const chaptersRecord = await db.collection('chapters').where('id', 'in', bookData.chapters).get();

  const data = chaptersRecord.docs.map((doc) => doc.data() as Chapter);

  AppSuccess({ res, data, message: '章節列表' });
});
