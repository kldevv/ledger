import { CategoryType, Currency } from "@prisma/client"
import { z } from "zod"

// TODO: Order procedures by CRUD
export namespace AccountApi {
  /**
   * CreateCategory route
   */
  export const CreateCategoryInputSchema = z.object({
    currency: z.nativeEnum(Currency),
    name: z.string(),
    type: z.nativeEnum(CategoryType)
  })
  export type CreateCategoryInput = z.infer<typeof CreateCategoryInputSchema>

  /**
   * UpdateCategoryName route
   */
  export const UpdateCategoryNameInputSchema = z.object({
    id: z.number(),
    name: z.string()
  })
  export type UpdateCategoryNameInput = z.infer<typeof UpdateCategoryNameInputSchema>

  /**
   * UpdateCategoryType route
   */
  export const UpdateCategoryTypeInputSchema = z.object({
    id: z.number(),
    type: z.nativeEnum(CategoryType)
  })
  export type UpdateCategoryTypeInput = z.infer<typeof UpdateCategoryTypeInputSchema>

  /**
   * GetAllCategories route
   */
  export const GetAllCategoriesInputSchema = z.object({
    currency: z.nativeEnum(Currency),
  })
  export type GetAllCategoriesInput = z.infer<typeof GetAllCategoriesInputSchema>
  export const GetAllCategoriesOutputSchema = z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      type: z.nativeEnum(CategoryType)
    })
  )
  export type GetAllCategoriesOutput = z.infer<typeof GetAllCategoriesOutputSchema>

  /**
   * CreateGroup route
   */
  export const CreateGroupInputSchema = z.object({
    currency: z.nativeEnum(Currency),
    name: z.string(),
    categoryId: z.number()
  })
  export type CreateGroupInput = z.infer<typeof CreateGroupInputSchema>

  /**
   * CreateAccount route
   */
  export const CreateAccountInputSchema = z.object({
    currency: z.nativeEnum(Currency),
    name: z.string(),
    groupId: z.number()
  })
  export type CreateAccountInput = z.infer<typeof CreateAccountInputSchema>

  /**
   * UpdateGroupName route
   */
  export const UpdateGroupNameInputSchema = z.object({
    id: z.number(),
    name: z.string()
  })
  export type UpdateGroupNameInput = z.infer<typeof UpdateGroupNameInputSchema>

  /**
   * UpdateGroupCategory route
   */
  export const UpdateGroupCategoryInputSchema = z.object({
    id: z.number(),
    categoryId: z.number()
  })
  export type UpdateGroupCategoryInput = z.infer<typeof UpdateGroupCategoryInputSchema>

  /**
   * GetAllGroups route
   */
  export const GetAllGroupsInputSchema = z.object({
    currency: z.nativeEnum(Currency),
  })
  export type GetAllGroupsInput = z.infer<typeof GetAllGroupsInputSchema>

  /**
   * DeleteGroup route
   */
  export const DeleteGroupInputSchema = z.object({
    id: z.number()
  })
  export type DeleteGroupInput = z.infer<typeof DeleteGroupInputSchema>
}