import { z } from 'zod'

export const memoSchema = z
  .string()
  .max(50, { message: 'memo.max' })
  .regex(/^[a-zA-Z0-9\s]*$/, { message: 'memo.regex' })
