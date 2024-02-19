import { EntryStatus } from '@/api/graphql'

import type { addEntrySchema } from '..'
import type { z } from 'zod'

export const addEntryDefaultValues: z.infer<typeof addEntrySchema> = {
  transactionDate: new Date(),
  memo: '',
  status: EntryStatus.PENDING,
  debit: 0,
  credit: 0,
  accountId: '',
}
