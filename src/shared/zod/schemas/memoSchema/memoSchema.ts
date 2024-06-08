import { z } from 'zod'

export const memoSchema = z.string().max(50, { message: 'memo.max' })
