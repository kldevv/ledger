import prisma from '@/server/db/prisma/client'

import type { Link } from '@prisma/client'

export type FindLinkProps = Pick<Link, 'id'>

export const findLink = async (where: FindLinkProps) => {
  return await prisma.link.findUnique({
    where,
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  })
}
