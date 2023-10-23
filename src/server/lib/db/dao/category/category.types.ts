import { Optional } from "@/types";
import { Category } from "@prisma/client";

/**
 * createCategory types
 */
export type CreateCategoryArgs = Pick<Category, 'name' | 'type'>

/**
 * getCategories
 */
export type GetCategoriesArgs = Partial<Pick<Category, 'id' | 'name' | 'type'>>
export type GetCategoriesReturns = Pick<Category, 'id' | 'name' | 'type'>[]

/**
 * updateCategory
 */
export type UpdateCategoryArgs = Optional<Pick<Category, 'id' | 'name' | 'type'>, 'name' | 'type'>

/**
 * deleteCategory
 */
export type DeleteCategoryArgs = Pick<Category, 'id'>