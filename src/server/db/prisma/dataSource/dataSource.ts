import {
  AccountDao,
  CategoryDao,
  EntryDao,
  TagDao,
  TransactionDao,
  TreasuryBookDao,
} from '@/server/db/prisma/dao'

export class PrismaDataSource {
  public account: typeof AccountDao
  public category: typeof CategoryDao
  public entry: typeof EntryDao
  public tag: typeof TagDao
  public transaction: typeof TransactionDao
  public treasuryBook: typeof TreasuryBookDao

  constructor() {
    this.account = AccountDao
    this.category = CategoryDao
    this.entry = EntryDao
    this.tag = TagDao
    this.transaction = TransactionDao
    this.treasuryBook = TreasuryBookDao
  }
}
