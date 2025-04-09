import { Response } from 'express';

type SuccessState = {
  res: Response;
  status?: boolean;
  data?: any;
  message: string;
};

const appSuccess = (susccessInfo: SuccessState) => {
  const { res, data, message, status = true } = susccessInfo;
  res.json({
    status,
    data,
    message
  });
};

export default appSuccess;
