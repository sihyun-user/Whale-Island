import express from 'express';

import * as authController from '../controllers/authentication';
import * as authSchema from '../schema/authentication';
import { isAuthenticated } from '../middlewares';

const authRouter = express.Router();

authRouter.post('/register', authSchema.register, authController.register);
authRouter.post('/thirdParty', authController.thirdPartyRegister);
authRouter.post('/idToken', authController.getAuthIdToken);
authRouter.get('/userInfo', isAuthenticated, authController.getUserInfo);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
