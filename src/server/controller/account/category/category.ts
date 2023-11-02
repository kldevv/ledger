import { CategoryDao } from "@/server/lib/db/dao";
import { ControllerError } from "../../error";
import { AccountApi } from "@/server/routers/account/account.types";

/**
 * createCategory controller
 */
export const createCategory = async ({ currency, name, type }: AccountApi.CreateCategoryInput): Promise<void> => {
  try { 
    await CategoryDao.createCategory({ currency }, { name, type })
  } catch (error) {
    throw ControllerError(error)
  }
}

/**
 * updateCategoryName controller
 */
export const updateCategoryName = async ({ id, name }: AccountApi.UpdateCategoryNameInput): Promise<void> => {
  try {
    await CategoryDao.updateCategory({ id, name })
  } catch (error) {
    throw ControllerError(error)
  }  
}

/**
 * updateCategoryType controller
 */
export const updateCategoryType = async ({ id, type }: AccountApi.UpdateCategoryTypeInput): Promise<void> => {
  try {
    await CategoryDao.updateCategory({ id, type })
  } catch (error) {
    throw ControllerError(error)
  }
}

/**
 * getAllCategories controller
 */
export const getAllCategories = async ({ currency }: AccountApi.GetAllCategoriesInput): Promise<AccountApi.GetAllCategoriesOutput> => {
  try {
    const categories = await CategoryDao.getCategories({ currency })

    return categories
  } catch (error) {
    throw ControllerError(error)
  }
}

/**
 * deleteCategory controller
 */
export const deleteCategory = async ({ id }: AccountApi.DeleteGroupInput): Promise<void> => {
  try {
    await CategoryDao.deleteCategory({ id })
  } catch (error) {
    throw ControllerError(error)
  }
}