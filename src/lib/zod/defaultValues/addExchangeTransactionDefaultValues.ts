import { z } from 'zod'
import { addEntryDefaultValues, addExchangeTransactionSchema } from '..'

export const addExchangeTransactionDefaultValues: z.infer<
  typeof addExchangeTransactionSchema
> = {
  treasuryBookId: '',
  entries: [],
}
