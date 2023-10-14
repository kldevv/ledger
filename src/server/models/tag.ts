import { Schema, InferSchemaType, model } from 'mongoose';
import { SharedSchema } from './utils';

/**
 * Tag schema
 */
const schema = new Schema({
  /**
   * Name of the tag
   */
  name: { type: String, required: true },
  /**
   * The balance of the tag by each month
   */
  balance: [SharedSchema.Balance]
}, {
  timestamps: true
});

/**
 * Tag type
 */
export type Tag = InferSchemaType<typeof schema>

/**
 * Stakeholder model
 */
export const TagModel = model('Tag', schema)



