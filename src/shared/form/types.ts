import type { addCategorySchema, addExchangeSchema } from '..'
import type { z } from 'zod'

export type ExchangeFormFieldValues = z.infer<typeof addExchangeSchema>

export type UpsertCategoryFormFieldValues = z.infer<typeof addCategorySchema>
