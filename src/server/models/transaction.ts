import { Schema, InferSchemaType, model } from 'mongoose';
import { TagModel } from './tag';
import { AccountModel } from './account';
import { StakeholderModel } from './stakeholder';

/**
 * Entry schema
 */
const EntrySchema = new Schema({
  /**
   * The account id associated with the entry
   */
  accountId: {
    type: Schema.Types.ObjectId,
    ref: AccountModel.modelName,
  },
  /**
   * The amount of the entry
   */
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  /**
   * The type of the amount of the entry
   */
  type: {
    type: String,
    required: true,
    enum: ['Debit', 'Credit']
  },
  /**
   * The memo of the entry
   */
  memo: {
    type: String
  },
  /**
   * The status of the entry
   */
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Complete']
  },
  /**
   * The stakeholder id of the entry, only required when the account of the entry is AP/AR
   * Note that it is not programmatically checked in the mongoose SDK level
   */
  stakeholderId: {
    type: Schema.Types.ObjectId,
    ref: StakeholderModel.modelName,
  }
})

/**
 * Transaction schema
 */
const TransactionSchema = new Schema({
  /**
   * The date of the transaction occurs
   */
  date: { type: Date, required: true },
  /**
   * The description of the transaction
   */
  description: { type: String, required: true },
  /**
   * The list of the relevant tags
   */
  tagIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: TagModel.modelName,
    }],
    required: true
  },
  /**
   * The list of entries under the transaction
   */
  entries: {
    type: [{
      type: EntrySchema
    }],
    required: true
  }
}, {
  timestamps: true
});

/**
 * Transaction type
 */
export type Transaction = InferSchemaType<typeof TransactionSchema>

/**
 * Transaction model
 */
export const TransactionModel = model('Tag', TransactionSchema)
