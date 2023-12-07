import { Entry, Tag, Transaction } from '@prisma/client'

export type TransactionWithDetail = Transaction & {
  entries: Entry[],
  tags: Tag[]
}
