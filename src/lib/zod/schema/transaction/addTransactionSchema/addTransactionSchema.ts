import { z } from 'zod'
import { addEntrySchema } from '../../entries'

export const addTransactionSchema = z
  .object({
    /**
     * Transaction accrual date
     */
    accrualDate: z.coerce.date(),
    /**
     * Transaction note
     */
    note: z.string().min(1),
    /**
     * Transaction tags
     */
    tagIds: z.string().array(),
    /**
     * Transaction entries
     */
    entries: addEntrySchema.array(),
  })
  .refine(
    (data) => {
      const sumDebits = data.entries.reduce(
        (sum, entry) => sum + entry.debit,
        0,
      )
      const sumCredits = data.entries.reduce(
        (sum, entry) => sum + entry.credit,
        0,
      )

      return sumDebits === sumCredits
    },
    {
      message: 'The sum of debits must equal the sum of credits',
    },
  )
