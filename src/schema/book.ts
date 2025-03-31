import { z } from 'zod';
import { validateText } from './index';
import validate from '../middlewares/validate';

export const updateBook = validate(
  z.object({
    title: validateText('作品名稱', 2, 20),
    description: validateText('作品簡介', 0, 200),
    category: z
      .array(
        z.enum([
          'romance',
          'bl',
          'gl',
          'fantasy',
          'sciFi',
          'mystery',
          'thriller',
          'isekai',
          'school',
          'workplace'
        ])
      )
      .min(1, { message: '至少選擇一個分類' })
      .max(3, { message: '最多可以選擇三個分類' }),
    status: z
      .enum(['draft', 'published'])
      .default('draft')
      .refine((status) => ['draft', 'published'].includes(status), {
        message: '狀態只能是 draft 或 published'
      }),
    ageClassify: z
      .enum(['g', 'r18', 'r18g'])
      .default('g')
      .refine((ageClassify) => ['g', 'r18', 'r18g'].includes(ageClassify), {
        message: '年齡分級只能是 g、r18 或 r18g'
      }),
    coverImage: z.string().default('')
  })
);
