import {
  AccountDao,
  CategoryDao,
  EntryDao,
  LinkDao,
  TagDao,
  TransactionDao,
  TreasuryBookDao,
} from '@/server/db/prisma/dao'

import * as repository from '../repository'

export class PrismaDataSource {
  public account: typeof AccountDao
  public category: typeof CategoryDao
  public entry: typeof EntryDao
  public tag: typeof TagDao
  public transaction: typeof TransactionDao
  public treasuryBook: typeof TreasuryBookDao
  public link: typeof LinkDao
  public repository: typeof repository

  constructor() {
    this.account = AccountDao
    this.category = CategoryDao
    this.entry = EntryDao
    this.tag = TagDao
    this.transaction = TransactionDao
    this.treasuryBook = TreasuryBookDao
    this.link = LinkDao
    this.repository = repository
  }
}
