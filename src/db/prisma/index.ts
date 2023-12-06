import { CategoryDao, EntryDao, ProfileDao, WalletDao } from './dao'

export class PrismaDataSource {
  public category: typeof CategoryDao;
  public entry: typeof EntryDao;
  public wallet: typeof WalletDao;
  public profile: typeof ProfileDao;

  constructor() {
    this.category = CategoryDao
    this.entry = EntryDao
    this.profile = ProfileDao
    this.wallet = WalletDao
  }
}