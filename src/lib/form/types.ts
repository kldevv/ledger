import { z } from 'zod'
import { addExchangeSchema } from '..'

export type UpsertExchangeFormFieldValues = z.infer<typeof addExchangeSchema>
