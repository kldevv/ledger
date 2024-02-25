import { z } from 'zod'

import { parseNumberString } from '@/shared'

import { addEntrySchema } from '../../entry'

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
    ({ entries }) => {
      const debits = entries.reduce(
        (sum, { debit }) => sum + parseNumberString(debit),
        0,
      )
      const credits = entries.reduce(
        (sum, { credit }) => sum + parseNumberString(credit),
        0,
      )

      return debits === credits
    },
    {
      message: 'The sum of debits must equal the sum of credits',
    },
  )
