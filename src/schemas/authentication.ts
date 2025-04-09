import { z } from 'zod';
import { required, validateText } from './index';
import validate from '../middlewares/validate';

export const register = validate(
  z
    .object({
      email: z.string({ required_error: required('信箱') }).email({ message: '請輸入正確的信箱' }),
      password: z
        .string({ required_error: required('密碼') })
        .min(6, { message: '密碼長度需大於 6 個字元' }),
      confirmPassword: z.string({ required_error: required('確認密碼') })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '密碼與確認密碼不相符',
      path: ['confirmPassword']
    })
);

export const updateUserInfo = validate(
  z.object({
    username: validateText('暱稱', 2, 20),
    description: z.string().max(200, '描述不能超過200字').optional(),
    avatar: z.string().optional()
  })
);
