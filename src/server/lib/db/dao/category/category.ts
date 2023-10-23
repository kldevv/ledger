import { Category } from "@prisma/client";
import prisma from "../../client";
import { CreateCategoryArgs, DeleteCategoryArgs, GetCategoriesArgs, GetCategoriesReturns, UpdateCategoryArgs } from "./category.types";
import { SharedContextArgs } from "../types";

export const createCategory = async (ctx: SharedContextArgs, args: CreateCategoryArgs): Promise<Category> => {
  const { name, type } = args

  try {
    const category = await prisma.category.create({
      data: {
        currency: ctx.currency,
        name,
        type
      },
    });

    return category;
  } catch (error) {
    console.error('Error in createCategory', ctx, args, error);
    throw error;
  }
};

export const getCategories = async (ctx: SharedContextArgs, args: GetCategoriesArgs): Promise<GetCategoriesReturns> => {
  const { id, name, type} = args

  try {
    const categories = await prisma.category.findMany({
      where: {
        currency: ctx.currency,
        id,
        name,
        type
      },
      select: {
        id: true,
        name: true,
        type: true,
      }
    });

    return categories;
  } catch (error) {
    console.error('Error in getCategories', ctx, args, error);
    throw error;
  }
}

export const updateCategory = async (ctx: SharedContextArgs, args: UpdateCategoryArgs): Promise<Category> => {
  const { id, name, type } = args

  if (name == null && type == null) {
    console.error('Error in updateCategory: Invalid Update Args', ctx, args);
    throw new Error('Invalid Update Args');
  }

  try {
    const category = await prisma.category.update({
      where: {
        id
      },
      data: {
        name,
        type
      }
    });

    return category;
  } catch (error) {
    console.error('Error in updateCategory', ctx, args, error);
    throw error;
  }
}

export const deleteCategory = async (ctx: SharedContextArgs, args: DeleteCategoryArgs): Promise<Category> => {
  const { id } = args

  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  } catch (error) {
    console.error('Error in deleteCategory', ctx, args, error);
    throw error;
  }
}