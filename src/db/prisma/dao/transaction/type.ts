import { Account, Entry, Tag, Transaction } from '@prisma/client'

export type TransactionWithDetail = Transaction & {
  entries: (Omit<Entry, 'accountId'> & { account: Account})[],
  tags: Tag[]
}
