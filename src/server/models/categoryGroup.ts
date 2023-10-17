import { Schema, InferSchemaType, model } from 'mongoose';
import { CategoryGroupType } from './utils';

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
    required: true,
    unique: true,
  }
})

/**
 * CategoryGroup schema
 */
const CategoryGroupSchema = new Schema({
  /**
   * The name of the category group
   */
  name: { type: String, required: true, unique: true },
  /**
   * The type of the category group
   */
  type: {
    type: String,
    enum: Object.values(CategoryGroupType),
    required: true,
  },
  /**
   * The list of categories under the category group
   */
  categories: {
    type: [CategorySchema],
    required: true
  }
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