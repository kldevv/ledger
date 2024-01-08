import {
  AccountDao,
  CategoryDao,
  EntryDao,
  TagDao,
  TransactionDao,
  VaultDao,
} from '@/server/db/prisma/dao'

export class PrismaDataSource {
  public account: typeof AccountDao
  public category: typeof CategoryDao
  public entry: typeof EntryDao
  public tag: typeof TagDao
  public transaction: typeof TransactionDao
  public vault: typeof VaultDao

  constructor() {
    this.account = AccountDao
    this.category = CategoryDao
    this.entry = EntryDao
    this.tag = TagDao
    this.transaction = TransactionDao
    this.vault = VaultDao
  }
}
