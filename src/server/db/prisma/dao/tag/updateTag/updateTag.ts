import prisma from '@/server/db/prisma/client'

import type { TagType } from '@prisma/client'

export interface UpdateTagArgs {
  /**
   * Tag id
   */
  id: string
  /**
   * Updated tag name
   */
  name: string
  /**
   * Updated tag type
   */
  type: TagType
}

export const updateTag = async ({ id, name, type }: UpdateTagArgs) => {
  return await prisma.tag.update({
    where: {
      id,
    },
    data: {
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
