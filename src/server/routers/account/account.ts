import { procedure } from "@/server/trpc";
import { AccountApi } from "./account.types";
import { AccountController } from "@/server/controller";

// TODO: Order procedures by CRUD
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

/**
 * CreateGroup route
 */
export const CreateGroup = procedure
  .input(AccountApi.CreateGroupInputSchema)
  .mutation(async (opts) => AccountController.createGroup(opts.input))

/**
 * CreateAccount route
 */
export const CreateAccount = procedure
  .input(AccountApi.CreateAccountInputSchema)
  .mutation(async (opts) => AccountController.createAccount(opts.input))

/**
 * UpdateGroupName route
 */
export const UpdateGroupName = procedure
  .input(AccountApi.UpdateGroupNameInputSchema)
  .mutation(async (opts) => AccountController.updateGroupName(opts.input))

/**
 * UpdateGroupCategory route
 */
export const UpdateGroupCategory = procedure
  .input(AccountApi.UpdateGroupCategoryInputSchema)
  .mutation(async (opts) => AccountController.updateGroupCategory(opts.input))


/**
 * GetAllGroups route
 */
export const GetAllGroups = procedure
  .input(AccountApi.GetAllGroupsInputSchema)
  .mutation(async (opts) => AccountController.getAllGroups(opts.input))


/**
 * DeleteGroup route
 */
export const DeleteGroup = procedure
  .input(AccountApi.DeleteGroupInputSchema)
  .mutation(async (opts) => AccountController.deleteGroup(opts.input))

/**
 * DeleteCategory route
 */
export const DeleteCategory = procedure
  .input(AccountApi.DeleteCategoryInputSchema)
  .mutation(async (opts) => AccountController.deleteCategory(opts.input))

/**
 * UpdateAccountName route
 */
export const UpdateAccountName = procedure
  .input(AccountApi.UpdateAccountNameInputSchema)
  .mutation(async (opts) => AccountController.updateAccountName(opts.input))