import express from 'express';

import * as bookController from '../controllers/book';
import * as bookSchema from '../schema/book';
import { isAuthenticated } from '../middlewares';

const bookRouter = express.Router();

bookRouter.post('/create', isAuthenticated, bookSchema.updateBook, bookController.createBook);
bookRouter.get('/list', bookController.getBooks);
bookRouter.get('/:id', bookController.getBook);
bookRouter.patch('/:id', isAuthenticated, bookSchema.updateBook, bookController.updateBook);

export default (router: express.Router) => {
  router.use('/book', bookRouter);
};
