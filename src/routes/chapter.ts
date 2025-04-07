import express from 'express';

import * as chapterController from '../controllers/chapter';
import * as chapterSchema from '../schemas/chapter';
import { isAuthenticated } from '../middlewares';

const chapterRouter = express.Router();

chapterRouter.post(
  '/create/:id',
  isAuthenticated,
  chapterSchema.createChapter,
  chapterController.createChapter
);

chapterRouter.get('/:id', chapterController.getChapter);

export default (router: express.Router) => {
  router.use('/chapter', chapterRouter);
};
