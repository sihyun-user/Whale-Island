import express from 'express';

import * as anchorController from '../controllers/anchor';
import { isAuthenticated } from '../middlewares';

const anchorRouter = express.Router();

anchorRouter.post('/create', isAuthenticated, anchorController.createAnchor);

export default (router: express.Router) => {
  router.use('/anchor', anchorRouter);
};
