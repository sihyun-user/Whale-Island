import express from 'express';

import * as authController from '../controllers/authentication';
import * as authSchema from '../schema/authentication';

const authRouter = express.Router();

authRouter.post('/register', authSchema.register, authController.register);
authRouter.post('/thirdParty', authController.thirdPartyRegister);
authRouter.post('/idToken', authController.getAuthIdToken);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
