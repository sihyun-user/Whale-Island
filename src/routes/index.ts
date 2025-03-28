import express from 'express';

import authentication from './authentication';
import book from './book';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  book(router);

  return router;
};
