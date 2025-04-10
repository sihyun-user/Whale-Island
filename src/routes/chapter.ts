import express from 'express';

import * as chapterController from '../controllers/chapter';
import * as chapterSchema from '../schemas/chapter';
import { isAuthenticated } from '../middlewares';

const chapterRouter = express.Router();

chapterRouter.post(
  '/create',
  isAuthenticated,
  chapterSchema.createChapter,
  chapterController.createChapter
);
chapterRouter.get('/list/:id', chapterController.getChapters);

export default (router: express.Router) => {
  router.use('/chapter', chapterRouter);
};
