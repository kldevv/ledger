import { findAccountGroups } from '@/server/db/prisma/dao/accountGroup'

import { transformAccountGroup } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const accountGroups: QueryResolvers['accountGroups'] = async (
  _,
  { input: { branchId } },
) => {
  const accountGroups = await findAccountGroups({
    branchId,
  })

  return accountGroups.map(transformAccountGroup)
}
