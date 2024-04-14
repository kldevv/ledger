import { createJournal } from '@/server/db/prisma/dao/journal'

import { transformJournal } from '../../transform'

import type { MutationResolvers } from '@/api/graphql'

export const addJournal: MutationResolvers['addJournal'] = async (
  _,
  { input: { entries, branchId, ...rest } },
) => {
  console.log(entries)
  const journal = await createJournal({
    ...rest,
    branchId,
    entries: entries.map(({ debit, credit, memo, ...rest }) => ({
      amount: debit > 0 ? debit : -credit,
      memo: memo ?? '',
      branchId,
      ...rest,
    })),
  })

  return transformJournal(journal)
}
