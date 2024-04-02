import { findTags } from '@/server/db/prisma/dao/tag'

import { transformTag } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const tags: QueryResolvers['tags'] = async (
  _,
  { input: { branchId } },
) => {
  const tags = await findTags({
    branchId,
  })

  return tags.map(transformTag)
}
