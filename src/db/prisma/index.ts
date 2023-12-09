import { 
  AccountDao,
  CategoryDao,
  EntryDao,
  ProfileDao,
  TagDao,
  TransactionDao,
  VaultDao
} from './dao'

export class PrismaDataSource {
  public account: typeof AccountDao;
  public category: typeof CategoryDao;
  public entry: typeof EntryDao;
  public profile: typeof ProfileDao;
  public tag: typeof TagDao
  public transaction: typeof TransactionDao
  public vault: typeof VaultDao;

  constructor() {
    this.account = AccountDao
    this.category = CategoryDao
    this.entry = EntryDao
    this.profile = ProfileDao
    this.tag = TagDao
    this.transaction = TransactionDao
    this.vault = VaultDao
  }
}