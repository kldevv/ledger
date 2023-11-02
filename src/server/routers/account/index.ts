import { router } from "@/server/trpc";
import { CreateCategory, UpdateCategoryName, UpdateCategoryType, GetAllCategories, CreateGroup, UpdateGroupName, UpdateGroupCategory, GetAllGroups, DeleteGroup, DeleteCategory } from "./account";

/**
 * Account router
 */
export const AccountRouter = router({
  CreateCategory,
  UpdateCategoryName,
  UpdateCategoryType,
  GetAllCategories,
  CreateGroup,
  UpdateGroupName,
  UpdateGroupCategory,
  GetAllGroups,
  DeleteGroup,
  DeleteCategory,
});