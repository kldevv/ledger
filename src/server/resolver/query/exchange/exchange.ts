import { transformExchange } from '@/server/resolver/transform'

import type { QueryResolvers } from '@/api/graphql'

export const exchange: QueryResolvers['exchange'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  const exchange = await prisma.exchange.findExchange(input)

  if (exchange == null) {
    return null
  }

  return transformExchange(exchange)
}