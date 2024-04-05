import { AccountDao, EntryDao, TransactionDao } from '@/server/db/prisma/dao'

import * as repository from '../repository'

export class PrismaDataSource {
  public account: typeof AccountDao
  public entry: typeof EntryDao
  public transaction: typeof TransactionDao
  public repository: typeof repository

  constructor() {
    this.account = AccountDao
    this.entry = EntryDao
    this.transaction = TransactionDao
    this.repository = repository
  }
}
