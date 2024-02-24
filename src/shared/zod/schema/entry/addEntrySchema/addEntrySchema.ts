import { z } from 'zod'

import { EntryStatus } from '@/api/graphql'

import { numberSchema } from '../..'

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
    debit: numberSchema,
    /**
     * Entry credit
     */
    credit: numberSchema,
    /**
     * Account id
     */
    accountId: z.string(),
  })
  .refine(
    ({ debit, credit }) =>
      (debit === 0 && credit > 0) || (credit === 0 && debit > 0),
    {
      message: 'Entry is not valid',
    },
  )
