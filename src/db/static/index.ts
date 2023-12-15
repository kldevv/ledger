import { CurrencyDao } from "./currency";

export class StaticDataSource {
  public currency: typeof CurrencyDao

  constructor() {
    this.currency = CurrencyDao
  }
}