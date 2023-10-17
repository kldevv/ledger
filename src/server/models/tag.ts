import { Schema, InferSchemaType, model } from 'mongoose';
import { BalanceSchema } from './utils';
import { AccountModel } from '.';

/**
 * AccountBalance schema
 */
const AccountBalance = new Schema({
  /**
   * The account id of the account balance
   */
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: AccountModel.modelName
  },
  /**
   * Tha balance of the account balance
   */
  balance: {
    type: [BalanceSchema],
    required: true,
  }
})

/**
 * Tag schema
 */
const TagSchema = new Schema({
  /**
   * The name of the tag
   */
  name: { type: String, required: true, unique: true },
  /**
   * The balance of the tag by each month
   */
  accountBalance: {
    type: [AccountBalance],
    required: true
  }
}, {
  timestamps: true
});

/**
 * Tag type
 */
export type Tag = InferSchemaType<typeof TagSchema>

/**
 * Tag model
 */
export const TagModel = model('Tag', TagSchema)