import prisma from '@/server/db/prisma/client'

import type { Link } from '@prisma/client'

export type FindLinksProps = Pick<Link, 'userId'>

export const findLinks = async (where: FindLinksProps) => {
  return await prisma.link.findMany({
    where,
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}
