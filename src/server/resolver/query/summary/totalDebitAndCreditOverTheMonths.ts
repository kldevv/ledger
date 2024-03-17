import { transformTotalDebitAndCreditOverTheMonths } from '@/server/resolver/transform'

import type { QueryResolvers } from '@/api/graphql'

export const totalDebitAndCreditOverTheMonths: QueryResolvers['totalDebitAndCreditOverTheMonths'] =
  async (_, { input }, { dataSources: { prisma } }) => {
    const data = await prisma.repository.findTotalDebitAndCreditOverTheMonths(
      input,
    )

    return transformTotalDebitAndCreditOverTheMonths(data)
  }
