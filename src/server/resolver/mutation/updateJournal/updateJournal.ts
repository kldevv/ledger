import { updateJournal as _updateJournal } from '@/server/db/prisma/dao/journal'

import { transformJournal } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const updateJournal: MutationResolvers['updateJournal'] = async (
  _,
  { input: { entries, branchId, ...rest } },
) => {
  const journal = await _updateJournal({
    ...rest,
    entries: entries.map(({ debit, credit, memo, ...rest }) => ({
      amount: debit > 0 ? debit : -credit,
      memo: memo ?? '',
      branchId,
      ...rest,
    })),
  })

  return transformJournal(journal)
}
