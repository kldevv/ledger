import { Schema, InferSchemaType, model } from 'mongoose';

/**
 * Category schema
 */
const CategorySchema = new Schema({
  /**
   * UUID of the category
   */
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  /**
   * The name of the category
   */
  name: {
    type: String,
    required: true
  }
})

/**
 * CategoryGroup schema
 */
const CategoryGroupSchema = new Schema({
  /**
   * Name of the category group
   */
  name: { type: String, required: true },
  /**
   * Type of the category group
   */
  type: {
    type: String,
    enum: ['Asset', 'Liabilities', 'Equity'],
    required: true,
  },
  /**
   * The list of categories under the category group
   */
  categories: [CategorySchema]
}, {
  timestamps: true
});

/**
 * CategoryGroup type
 */
export type CategoryGroup = InferSchemaType<typeof CategoryGroupSchema>

/**
 * CategoryGroup model
 */
export const CategoryGroup = model('CategoryGroup', CategoryGroupSchema)