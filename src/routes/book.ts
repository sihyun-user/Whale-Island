import express from 'express';

import * as bookController from '../controllers/book';
import { isAuthenticated } from '../middlewares';

const bookRouter = express.Router();

bookRouter.post('/create', isAuthenticated, bookController.createBook);
bookRouter.get('/list', bookController.getBooks);

export default (router: express.Router) => {
  router.use('/book', bookRouter);
};
