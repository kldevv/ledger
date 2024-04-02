import { findTotalDebitAndCreditOverTheMonths } from '@/server/db/prisma/repository'
import { transformTotalDebitAndCreditOverTheMonths } from '@/server/resolver/transform'

import type { QueryResolvers } from '@/api/graphql'

export const totalDebitAndCreditOverTheMonths: QueryResolvers['totalDebitAndCreditOverTheMonths'] =
  async (_, { input }) => {
    const data = await findTotalDebitAndCreditOverTheMonths(input)

    return transformTotalDebitAndCreditOverTheMonths(data)
  }
