import { RequestHandler } from 'express';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';
import { Chapter } from '../types/chapter';

const db = admin.firestore();

export const createChapter: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;
  const { id: bookId } = req.params;
  const { title, content, status, isAnchor } = req.body;

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
    bookId,
    title,
    content,
    paragraphOne: null,
    paragraphTwo: null,
    paragraphThree: null,
    status,
    isAnchor,
    commentIds: [],
    activityIds: [],
    updatedAt: Date.now(),
    createdAt: Date.now()
  };

  const chapterRef = await db.collection('chapters').add(params);
  const chapterId = chapterRef.id;
  await chapterRef.update({ id: chapterId });

  AppSuccess({ res, message: '章節建立成功' });
});
