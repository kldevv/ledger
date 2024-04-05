import { findEntries } from '@/server/db/prisma/dao/entry'

import { transformEntry } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const entries: QueryResolvers['entries'] = async (
  _,
  { input: { branchId, accountGroupId, accountId, journalId } },
) => {
  const entries = await findEntries({
    branchId: branchId ?? undefined,
    journalId: journalId ?? undefined,
    accountId: accountId ?? undefined,
    accountGroupId: accountGroupId ?? undefined,
  })

  return entries.map(transformEntry)
}
