import { WalletDao } from './dao'

export class PrismaDataSource {
  public walletDS: typeof WalletDao;

  constructor() {
    this.walletDS = WalletDao
  }
}