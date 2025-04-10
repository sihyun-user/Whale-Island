import express from 'express';

import authentication from './authentication';
import book from './book';
import chapter from './chapter';
import anchor from './anchor';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  book(router);
  chapter(router);
  anchor(router);

  return router;
};
