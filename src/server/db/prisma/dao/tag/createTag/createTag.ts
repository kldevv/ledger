import prisma from '@/server/db/prisma/client'

import type { TagType } from '@prisma/client'

export interface CreateTagArgs {
  /**
   * Branch id
   */
  branchId: string
  /**
   * Tag name
   */
  name: string
  /**
   * Tag type
   */
  type: TagType
}

export const createTag = async ({ branchId, name, type }: CreateTagArgs) => {
  return await prisma.tag.create({
    data: {
      branchId,
      name,
      type,
    },
    include: {
      _count: {
        select: {
          journals: true,
        },
      },
    },
  })
}
