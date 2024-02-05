import { transformExchange } from '@/server/resolver/transform'

import type { QueryResolvers } from '@/api/graphql'

export const exchanges: QueryResolvers['exchanges'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  const exchanges = await prisma.exchange.findExchanges(input)

  return exchanges.map(transformExchange)
}
