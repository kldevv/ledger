import { exchangeTransform } from '@/server/resolver/transform'

import type { QueryResolvers } from '@/api/graphql'

export const getExchanges: QueryResolvers['getExchanges'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  const exchanges = await prisma.exchange.findExchanges(input)

  return exchanges.map(exchangeTransform)
}
