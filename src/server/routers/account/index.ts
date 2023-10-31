import { router } from "@/server/trpc";
import { CreateCategory, UpdateCategoryName, UpdateCategoryType, GetAllCategories } from "./account";

/**
 * Account router
 */
export const AccountRouter = router({
  CreateCategory,
  UpdateCategoryName,
  UpdateCategoryType,
  GetAllCategories,
});