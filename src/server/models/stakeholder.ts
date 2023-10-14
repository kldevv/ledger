import { Schema, InferSchemaType, model } from 'mongoose';
import { SharedSchema } from './utils';

/**
 * Stakeholder schema
 */
const schema = new Schema({
  /**
   * Name of the stakeholder
   */
  name: { type: String, required: true },
  /**
   * The balance of the stakeholder by each month
   */
  balance: [SharedSchema.Balance]
}, {
  timestamps: true
});

/**
 * Stakeholder type
 */
export type Stakeholder = InferSchemaType<typeof schema>

/**
 * Stakeholder model
 */
export const StakeholderModel = model('Stakeholder', schema)



