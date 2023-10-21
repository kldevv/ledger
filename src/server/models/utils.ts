import { Model, Schema, model } from 'mongoose';

/**
 * Balance schema
 */
export const BalanceSchema = new Schema({
  /**
   * The year of the balance
   */
  year: { 
    type: Number,
    required: true,
    min: 2010,
    max: 2050,
  },
  /**
   * The month of the balance
   */
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  /**
   * The total debit of the balance
   */
  debit: {
    type: Number,
    required: true,
    min: 0
  },
  /**
   * The total credit of the balance
   */
  credit: {
    type: Number,
    required: true,
    min: 0
  }
});

/**
 * Category group type
 */
export enum CategoryGroupType {
  Asset = 'Asset',
  Liabilities = 'Liabilities',
  Equity = 'Equity',
}

/**
 * Entry type
 */
export enum EntryType {
  Debit = 'Debit',
  Credit = 'Credit'
}

/**
 * Entry status
 */
export enum EntryStatus {
  Pending = 'Pending',
  Complete = 'Complete'
}

interface ITest {
  name: string
  balance: number
}

const test = new Schema<ITest, Model<ITest>>({
  name: String,
  balance: Number
})

const testM = model<ITest>('Test', test)