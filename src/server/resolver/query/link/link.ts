import { findLink } from '@/server/db/prisma/dao/link'

import { tLink } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const link: QueryResolvers['link'] = async (_, { input }) => {
  const link = await findLink(input)

  return link != null ? tLink(link) : null
}
