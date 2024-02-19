import { z } from 'zod'

import { CategoryType } from '@/api/graphql'

export const addCategorySchema = z.object({
  /**
   * Category name
   */
  name: z.string().min(1).max(50),
  /**
   * Category type
   */
  type: z.nativeEnum(CategoryType),
})
