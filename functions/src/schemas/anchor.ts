import { z } from 'zod';
import { required, validateText } from './index';
import validate from '../middlewares/validate';

export const createAnchor = validate(
  z.object({
    bookId: z.string({ required_error: required('作品 Id') }),
    title: validateText('章節名稱', 2, 20),
    content: z.string().default(''),
    status: z
      .enum(['draft', 'published'])
      .default('draft')
      .refine((status) => ['draft', 'published'].includes(status), {
        message: '狀態只能是 draft 或 published'
      }),
    isAnchor: z.boolean().default(false)
  })
);
