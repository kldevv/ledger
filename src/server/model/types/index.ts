import { types } from "papr";

export const balanceObjectType = types.object({
  /**
   * Year of the balance
   */
  year: types.number({ required: true, minimum: 1990, maximum: 2025, multipleOf: 1 }),
  /**
   * Month of the balance
   */
  month: types.number({ required: true, minimum: 1, maximum: 12, multipleOf: 1 }),
  /**
   * Debit of the balance
   */
  debit: types.number({ required: true, minimum: 0 }),
  /**
   * Credit of the balance
   */
  credit: types.number({ required: true, minimum: 0 }),
})

export enum CatalogType {
  Asset = 'Asset',
  Liabilities = 'Liabilities',
  Equity = 'Equity',
}

export enum EntryType {
  Debit = 'Debit',
  Credit = 'Credit',
}

export enum EntryStatus {
  Pending = 'Pending',
  Complete = 'Complete',
}