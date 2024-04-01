import {
  AccountDao,
  CategoryDao,
  EntryDao,
  TagDao,
  TransactionDao,
} from '@/server/db/prisma/dao'

import * as repository from '../repository'

export class PrismaDataSource {
  public account: typeof AccountDao
  public category: typeof CategoryDao
  public entry: typeof EntryDao
  public tag: typeof TagDao
  public transaction: typeof TransactionDao
  public repository: typeof repository

  constructor() {
    this.account = AccountDao
    this.category = CategoryDao
    this.entry = EntryDao
    this.tag = TagDao
    this.transaction = TransactionDao
    this.repository = repository
  }
}
