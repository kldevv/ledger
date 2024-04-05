import { updateTag as _updateTag } from '@/server/db/prisma/dao/tag'

import { transformTag } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateTag: MutationResolvers['updateTag'] = async (
  _,
  { input: { id, name, type } },
) => {
  const tag = await _updateTag({
    id,
    name,
    type,
  })

  return transformTag(tag)
}
