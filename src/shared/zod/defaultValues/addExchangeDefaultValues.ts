import { addExchangeTransactionDefaultValues } from '.'

import type { addExchangeSchema } from '..'
import type { z } from 'zod'

export const addExchangeDefaultValues: z.infer<typeof addExchangeSchema> = {
  accrualDate: new Date(),
  note: '',
  origin: addExchangeTransactionDefaultValues,
  destination: addExchangeTransactionDefaultValues,
}
