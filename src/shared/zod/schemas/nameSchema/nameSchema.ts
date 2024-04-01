import { z } from 'zod'

export const nameSchema = z
  .string()
  .min(5, { message: 'name.min' })
  .max(20)
  .regex(/^[a-zA-Z0-9]+$/, { message: 'name.regex' })
