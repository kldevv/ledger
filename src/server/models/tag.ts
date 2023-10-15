import { Schema, InferSchemaType, model } from 'mongoose';
import { BalanceSchema } from './utils';

/**
 * Tag schema
 */
const TagSchema = new Schema({
  /**
   * The name of the tag
   */
  name: { type: String, required: true },
  /**
   * The balance of the tag by each month
   */
  balance: {
    type: [BalanceSchema],
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
