import { z } from 'zod'

export const nameSchema = z
  .string()
  .min(5, { message: 'name.min' })
  .max(35, { message: 'name.max' })
  .regex(/^[a-zA-Z0-9\s]+$/, { message: 'name.regex' })
