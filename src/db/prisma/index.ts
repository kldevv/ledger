import { AccountDao, CategoryDao, EntryDao, ProfileDao, TagDao, WalletDao } from './dao'

export class PrismaDataSource {
  public account: typeof AccountDao;
  public category: typeof CategoryDao;
  public entry: typeof EntryDao;
  public profile: typeof ProfileDao;
  public tag: typeof TagDao
  public wallet: typeof WalletDao;

  constructor() {
    this.account = AccountDao
    this.category = CategoryDao
    this.entry = EntryDao
    this.profile = ProfileDao
    this.tag = TagDao
    this.wallet = WalletDao
  }
}