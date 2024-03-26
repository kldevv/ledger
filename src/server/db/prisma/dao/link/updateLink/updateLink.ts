import prisma from '@/server/db/prisma/client'

import type { Link } from '@prisma/client'

export type UpdateLinkProps = Pick<Link, 'id'> &
  Partial<Pick<Link, 'name' | 'type'>>

export const updateLink = async ({ id, name, type }: UpdateLinkProps) => {
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
          transactions: true,
        },
      },
    },
  })
}
