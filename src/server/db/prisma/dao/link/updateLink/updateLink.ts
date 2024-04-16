import prisma from '@/server/db/prisma/client'

import type { LinkType } from '@prisma/client'

export interface UpdateLinkArgs {
  /**
   * Link id
   */
  id: string
  /**
   * Updated link name
   */
  name: string
  /**
   * Updated link type
   */
  type: LinkType
}

export const updateLink = async ({ id, name, type }: UpdateLinkArgs) => {
  return await prisma.link.update({
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
