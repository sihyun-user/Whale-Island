import { RequestHandler } from 'express';
import admin from '../config/firebase';
import catchAsync from '../helpers/catchAsync';
import AppSuccess from '../helpers/appSuccess';
import AppError from '../helpers/appError';
import errorState from '../helpers/errorState';
import { Anchor } from '../types/anchor';

const db = admin.firestore();

export const createAnchor: RequestHandler = catchAsync(async (req, res, next) => {
  const { uid } = req;
  const { bookId, content, subject, rules, status } = req.body;

  const bookDoc = await db.collection('books').doc(bookId).get();

  if (!bookDoc.exists) {
    return AppError(errorState.BOOK_NOT_FOUND, next);
  }

  const bookData = bookDoc.data();

  if (bookData?.authorId !== uid) {
    return AppError(errorState.UNAUTHORIZED, next);
  }

  const params: Anchor = {
    id: null,
    content,
    subject,
    rules,
    status,
    comments: [],
    updatedAt: Date.now(),
    createdAt: Date.now()
  };

  const anchorRef = await db.collection('anchors').add(params);
  const anchorId = anchorRef.id;
  await anchorRef.update({ id: anchorId });

  await db
    .collection('books')
    .doc(bookId)
    .update({
      anchors: admin.firestore.FieldValue.arrayUnion(anchorId)
    });

  AppSuccess({ res, message: '安價建立成功' });
});
