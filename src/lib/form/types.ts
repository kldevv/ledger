import type { addExchangeSchema } from '..'
import type { z } from 'zod'

export type UpsertExchangeFormFieldValues = z.infer<typeof addExchangeSchema>
