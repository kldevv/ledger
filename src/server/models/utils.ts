import { Schema, InferSchemaType } from 'mongoose';

/**
 * Stakeholder schema
 */
const Balance = new Schema({
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


export const SharedSchema = Object.freeze({
  Balance,
})




