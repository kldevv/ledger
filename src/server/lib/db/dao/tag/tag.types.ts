import { Tag } from "@prisma/client";

/**
 * createTag
 */
export type CreateTagArgs = Pick<Tag, 'name'>

/**
 * getTags
 */
export type GetTagsArgs = Partial<Pick<Tag, 'id' | 'name'>>
export type GetTagsReturns = Pick<Tag, 'id' | 'name'>[]

/**
 * updateTag
 */
export type UpdateTagArgs = Pick<Tag, 'id' | 'name'>

/**
 * deleteTag
 */
export type DeleteTagArgs = Pick<Tag, 'id'>