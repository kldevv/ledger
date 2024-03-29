import { z } from 'zod'

import { EntryStatus } from '@/api/graphql'
import { parseCurrencyNumericFormat } from '@/shared'

export const addEntrySchema = z
  .object({
    /**
     * Entry transaction date
     */
    transactionDate: z.coerce.date(),
    /**
     * Entry optional memo
     */
    memo: z.string(),
    /**
     * Entry status
     */
    status: z.nativeEnum(EntryStatus),
    /**
     * Entry debit
     */
    debit: z.string(),
    /**
     * Entry credit
     */
    credit: z.string(),
    /**
     * Account id
     */
    accountId: z.string(),
  })
  .refine(
    ({ debit, credit }) => {
      const d = parseCurrencyNumericFormat(debit)
      const c = parseCurrencyNumericFormat(credit)

      return (d === 0 && c > 0) || (c === 0 && d > 0)
    },
    {
      message: 'Entry is not valid',
    },
  )
