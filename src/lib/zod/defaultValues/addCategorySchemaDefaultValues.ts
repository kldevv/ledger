import { CategoryType } from '@/api/graphql'

import type { addCategorySchema } from '..'
import type { z } from 'zod'

export const addCategorySchemaDefaultValues: z.infer<typeof addCategorySchema> =
  {
    name: '',
    type: CategoryType.ASSETS,
  }
