import { z } from 'zod'

export const cuidSchema = z
  .string()
  .regex(/^[cC][a-zA-Z0-9]{24}$/, { message: 'uuid.regex' })
