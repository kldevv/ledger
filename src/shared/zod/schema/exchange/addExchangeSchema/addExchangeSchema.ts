import { z } from 'zod'
import { addExchangeTransactionSchema } from '../addExchangeTransactionSchema'

export const addExchangeSchema = z.object({
  /**
   * Accrual date
   */
  accrualDate: z.coerce.date(),
  /**
   * Exchange note
   */
  note: z.string(),
  /**
   * Exchange origin
   */
  origin: addExchangeTransactionSchema,
  /**
   * Exchange destination
   */
  destination: addExchangeTransactionSchema,
})
