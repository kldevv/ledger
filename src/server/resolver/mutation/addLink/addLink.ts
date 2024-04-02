import { createLink } from '@/server/db/prisma/dao/link'

import { transformLink } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const addLink: MutationResolvers['addLink'] = async (_, { input }) => {
  const link = await createLink(input)

  return transformLink(link)
}
