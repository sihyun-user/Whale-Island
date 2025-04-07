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
  const { title, content, status, isAnchor, anchorContent, anchorRules } = req.body;

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
    paragraphOne: null,
    paragraphTwo: null,
    paragraphThree: null,
    status,
    isAnchor,
    anchorId: null,
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

  if (isAnchor) {
    const anchorRef = await db.collection('anchors').add({
      id: null,
      content: anchorContent,
      rules: anchorRules,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      comments: []
    });

    const anchorId = anchorRef.id;
    await chapterRef.update({ anchorId });
    await anchorRef.update({ id: anchorId });
  }

  AppSuccess({ res, message: '章節建立成功' });
});

export const getChapter: RequestHandler = catchAsync(async (req, res, next) => {
  const { id: chapterId } = req.params;

  const chapterDoc = await db.collection('chapters').doc(chapterId).get();

  if (!chapterDoc.exists) {
    return AppError(errorState.CHAPTER_NOT_FOUND, next);
  }

  const chapterData = chapterDoc.data();

  if (chapterData?.isAnchor) {
    const anchorDoc = await db.collection('anchors').doc(chapterData.anchorId).get();

    if (anchorDoc.exists) {
      const anchorData = anchorDoc.data();
      chapterData.anchor = anchorData;
      delete chapterData.anchorId;
    }
  }

  AppSuccess({ res, data: chapterData, message: '章節資料取得成功' });
});
