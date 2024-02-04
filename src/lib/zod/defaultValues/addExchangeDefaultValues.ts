import { z } from 'zod'
import { addExchangeSchema, addExchangeTransactionDefaultValues } from '..'

export const addExchangeDefaultValues: z.infer<typeof addExchangeSchema> = {
  accrualDate: new Date(),
  note: '',
  origin: addExchangeTransactionDefaultValues,
  destination: addExchangeTransactionDefaultValues,
}
