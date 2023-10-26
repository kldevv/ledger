import { CategoryDao } from "@/server/lib/db/dao";
import { Currency } from "@prisma/client";
import { ControllerError } from "../../error";
import { CreateCategoryArgs, UpdateCategoryNameArgs, UpdateCategoryTypeArgs } from "./category.interface";
import { Category } from "../types";


export const createCategory = async ({ currency, name, type }: CreateCategoryArgs): Promise<void> => {
  try { 
    await CategoryDao.createCategory({ currency }, { name, type })
  } catch (error) {
    throw ControllerError(error)
  }
}

export const updateCategoryName = async ({ id, name }: UpdateCategoryNameArgs): Promise<void> => {
  try {
    await CategoryDao.updateCategory({ id, name })
  } catch (error) {
    throw ControllerError(error)
  }  
}

export const updateCategoryType = async ({ id, type }: UpdateCategoryTypeArgs): Promise<void> => {
  try {
    await CategoryDao.updateCategory({ id, type })
  } catch (error) {
    throw ControllerError(error)
  }
}

export const getAllCategories = async (currency: Currency): Promise<Category[]> => {
  try {
    const categories = await CategoryDao.getCategories({ currency })

    return categories
  } catch (error) {
    throw ControllerError(error)
  }
}