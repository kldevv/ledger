import { Optional } from "@/types";
import { Category, Group } from "@prisma/client";

/**
 * createGroup
 */
export type CreateGroupArgs = Pick<Group, 'name' | 'categoryId'>

/**
 * getGroups
 */
export type GetGroupsArgs = Partial<Pick<Group, 'id' | 'name' | 'categoryId'>>
export type GetGroupsReturns = Pick<Group, 'id' | 'name'> & {
  'category': Pick<Category, 'name' | 'type'>
}

/**
 * updateGroup
 */
export type UpdateGroupArgs = Optional<Pick<Group, 'id' | 'name' | 'categoryId'>, 'name' | 'categoryId'>

/**
 * deleteGroup
 */
export type DeleteGroupArgs = Pick<Group, 'id'>