import { z } from 'zod'

export const noteSchema = z
  .string()
  .min(5, { message: 'note.min' })
  .max(50, { message: 'note.max' })
  .regex(/^[a-zA-Z0-9\s]+$/, { message: 'note.regex' })
