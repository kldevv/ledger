import prisma from '@/server/db/prisma/client'

import { createMutation } from '../../../utils'

import type { LinkType } from '@prisma/client'

export interface CreateLinkArgs {
  /**
   * User id
   */
  userId: string
  /**
   * Link name
   */
  name: string
  /**
   * Link type
   */
  type: LinkType
}

export const createLink = createMutation({
  mutation: async ({ userId, name, type }: CreateLinkArgs) => {
    return await prisma.link.create({
      data: { userId, name, type },
      include: {
        _count: {
          select: {
            journals: true,
          },
        },
      },
    })
  },
  name: 'createLink',
})
