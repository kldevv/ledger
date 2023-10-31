import { router } from "@/server/trpc";
import { CreateCategory, UpdateCategoryName, UpdateCategoryType, GetAllCategories, CreateGroup } from "./account";

/**
 * Account router
 */
export const AccountRouter = router({
  CreateCategory,
  UpdateCategoryName,
  UpdateCategoryType,
  GetAllCategories,
  CreateGroup,
});