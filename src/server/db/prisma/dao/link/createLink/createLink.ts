import prisma from '@/server/db/prisma/client'

import type { Link } from '@prisma/client'

export type CreateLinkInput = Pick<Link, 'name' | 'userId' | 'type'>

export const createLink = async (input: CreateLinkInput) => {
  return await prisma.link.create({
    data: input,
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  })
}
