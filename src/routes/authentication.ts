import express from 'express';

import * as authController from '../controllers/authentication';
import { checkIfAuthenticated } from '../helpers/checkIfAuthenticated';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/checkIfAuthenticated', checkIfAuthenticated, authController.checkIfAuthenticated);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
