import { Category } from "@prisma/client";
import prisma from "../../client";
import { CreateCategoryArgs, DeleteCategoryArgs, GetCategoriesArgs, GetCategoriesReturns, UpdateCategoryArgs } from "./category.types";
import { SharedContextArgs } from "../types";

export const createCategory = async (ctx: SharedContextArgs, args: CreateCategoryArgs): Promise<Category> => {
  try {
    const category = await prisma.category.create({
      data: {
        currency: ctx.currency,
        name: args.name,
        type: args.type,
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
    console.error('Error in getAllCategories', ctx, error);
    throw error;
  }
}

export const updateCategory = async (ctx: SharedContextArgs, args: UpdateCategoryArgs): Promise<Category> => {
  const { name, type } = args

  if (name == null && type == null) {
    console.error('Error in updateCategory: Invalid Update Args', ctx, args);
    throw new Error('Invalid Update Args');
  }

  try {
    const categories = await prisma.category.update({
      where: {
        id: args.id,
      },
      data: {
        name,
        type
      }
    });

    return categories;
  } catch (error) {
    console.error('Error in updateCategory', ctx, error);
    throw error;
  }
}

export const deleteCategory = async (ctx: SharedContextArgs, args: DeleteCategoryArgs) => {
  try {
    const categories = await prisma.category.delete({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        name: true,
        type: true,
      }
    });

    return categories;
  } catch (error) {
    console.error('Error in updateCategory', ctx, error);
    throw error;
  }
}