import { z } from 'zod'
import { addEntrySchema } from '..'
import { EntryStatus } from '@/api/graphql'

export const addEntryDefaultValues: z.infer<typeof addEntrySchema> = {
  transactionDate: new Date(),
  memo: '',
  status: EntryStatus.PENDING,
  debit: 0,
  credit: 0,
  accountId: '',
}
