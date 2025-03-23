import express from 'express';

import * as authController from '../controllers/authentication';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
