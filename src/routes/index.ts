import express from 'express';

import authentication from './authentication';
import book from './book';
import chapter from './chapter';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  book(router);
  chapter(router);

  return router;
};
