import { findAccountGroup } from '@/server/db/prisma/dao/accountGroup'

import { transformAccountGroup } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const accountGroup: QueryResolvers['accountGroup'] = async (
  _,
  { input: { id } },
) => {
  const accountGroup = await findAccountGroup({
    id,
  })

  if (!accountGroup) return null

  return transformAccountGroup(accountGroup)
}
