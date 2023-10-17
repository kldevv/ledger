import { Schema, InferSchemaType, model } from 'mongoose';
import { BalanceSchema } from './utils';

/**
 * Stakeholder schema
 */
const StakeholderSchema = new Schema({
  /**
   * The name of the stakeholder
   */
  name: { type: String, required: true },
  /**
   * The balance of the stakeholder by each month
   */
  balance: {
    type: [BalanceSchema],
    required: true
  }
}, {
  timestamps: true
});

/**
 * Stakeholder type
 */
export type Stakeholder = InferSchemaType<typeof StakeholderSchema>

/**
 * Stakeholder model
 */
export const StakeholderModel = model('Stakeholder', StakeholderSchema)



