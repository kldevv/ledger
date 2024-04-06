import { findTotalOverMonths } from '@/server/db/prisma/repository'
import { transformTotalOverMonths } from '@/server/resolver/transform'

import type { QueryResolvers } from '@/api/graphql'

export const totalOverMonths: QueryResolvers['totalOverMonths'] = async (
  _,
  { input },
) => {
  const data = await findTotalOverMonths(input)

  return transformTotalOverMonths(data)
}
