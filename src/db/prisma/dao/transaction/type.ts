import { Entry, Tag, Transaction } from '@prisma/client'

export type TransactionWithDetail = Transaction & {
  entries: (Omit<Entry, 'accountId'> & { account: { id: string, name: string}})[],
  tags: Tag[]
}
