import { procedure } from "@/server/trpc";
import { AccountApi } from "./account.types";
import { AccountController } from "@/server/controller";

/**
 * CreateCategory route
 */
export const CreateCategory = procedure
  .input(AccountApi.CreateCategoryInputSchema)
  .mutation(async (opts) => AccountController.createCategory(opts.input))

/**
 * UpdateCategoryName route
 */
export const UpdateCategoryName = procedure
  .input(AccountApi.UpdateCategoryNameInputSchema)
  .mutation(async (opts) => AccountController.updateCategoryName(opts.input))

/**
 * UpdateCategoryType route
 */
export const UpdateCategoryType = procedure
  .input(AccountApi.UpdateCategoryTypeInputSchema)
  .mutation(async (opts) => AccountController.updateCategoryType(opts.input))

/**
 * GetAllCategories route
 */
export const GetAllCategories = procedure
  .input(AccountApi.GetAllCategoriesInputSchema)
  .output(AccountApi.GetAllCategoriesOutputSchema)
  .query(async (opts) => AccountController.getAllCategories(opts.input))