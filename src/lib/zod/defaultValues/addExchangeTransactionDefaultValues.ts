import type { addExchangeTransactionSchema } from '..'
import type { z } from 'zod'

export const addExchangeTransactionDefaultValues: z.infer<
  typeof addExchangeTransactionSchema
> = {
  treasuryBookId: '',
  entries: [],
}
