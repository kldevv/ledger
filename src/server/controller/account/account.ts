import { CategoryDao } from "@/server/lib/db/dao";
import { CategoryType, Currency } from "@prisma/client";
import { ControllerError } from "../error";

export const createCategory = async (currency: Currency, name: string, type: CategoryType): Promise<void> => {
  try {
    await CategoryDao.createCategory({ currency }, { name, type })
  } catch (error) {
    throw ControllerError(error)
  }
}

export const updateCategoryName = async (id: number, name: string): Promise<void> => {
  try {
    await CategoryDao.updateCategory({ id, name })
  } catch (error) {
    throw ControllerError(error)
  }  
}

export const updateCategoryType = async (id: number, type: CategoryType): Promise<void> => {
  try {
    await CategoryDao.updateCategory({ id, type })
  } catch (error) {
    throw ControllerError(error)
  }
}

export const getAllCategories = async (currency: Currency): Promise<Account.Categories> => {
  try {
    const categories = await CategoryDao.getCategories({ currency })

    return categories
  } catch (error) {
    throw ControllerError(error)
  }
}