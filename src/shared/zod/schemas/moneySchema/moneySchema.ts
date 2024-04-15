import { z } from 'zod'

export const moneySchema = z
  .string()
  .regex(/^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/, { message: 'money.regex' })
