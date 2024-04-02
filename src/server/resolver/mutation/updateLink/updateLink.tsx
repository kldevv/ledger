import { updateLink as _updateLink } from '@/server/db/prisma/dao/link'

import { transformLink } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateLink: MutationResolvers['updateLink'] = async (
  _,
  { input },
) => {
  const link = await _updateLink(input)

  return transformLink(link)
}
