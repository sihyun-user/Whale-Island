import { z } from 'zod';

export const required = (field: string) => `${field}為必填欄位`;

export const validateText = (field: string, minLength: number, maxLength: number) => {
  let schema = z
    .string()
    .min(minLength, { message: `${field}需至少 ${minLength} 個字元` })
    .max(maxLength, { message: `${field}需至多 ${maxLength} 個字元` })
    .refine((value) => /[^\s!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/.test(value), {
      message: `${field}不可包含空白及特殊符號`
    });
  return schema;
};
