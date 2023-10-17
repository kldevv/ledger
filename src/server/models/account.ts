import { Schema, InferSchemaType, model } from 'mongoose';
import { BalanceSchema } from './utils';

/**
 * Account schema
 */
const AccountSchema = new Schema({
  /**
   * The name of the account
   */
  name: { type: String, required: true, unique: true },
  /**
   * The category id of the account
   */
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  /**
   * The balance of the account by each month
   */
  balance: {
    type: [BalanceSchema],
    required: true
  }
}, {
  timestamps: true
});

/**
 * Account type
 */
export type Account = InferSchemaType<typeof AccountSchema>

/**
 * Account model
 */
export const AccountModel = model('Tag', AccountSchema)
