import express from 'express';

import * as authController from '../controllers/authentication';
import * as authSchema from '../schema/authentication';
import { checkIfAuthenticated } from '../helpers/checkIfAuthenticated';

const authRouter = express.Router();

authRouter.post('/register', authSchema.register, authController.register);
authRouter.post('/thirdParty', authController.thirdPartyRegister);
authRouter.post('/checkIfAuthenticated', checkIfAuthenticated, authController.checkIfAuthenticated);

export default (router: express.Router) => {
  router.use('/auth', authRouter);
};
