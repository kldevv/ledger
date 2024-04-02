import { findLinks } from '@/server/db/prisma/dao/link'

import { transformLink } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const links: QueryResolvers['links'] = async (_, { input }) => {
  const links = await findLinks(input)

  return links.map(transformLink)
}
