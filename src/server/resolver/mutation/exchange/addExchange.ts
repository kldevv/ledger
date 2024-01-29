import type { MutationResolvers } from '@/api/graphql'
import {
  addExchangeTransactionTransform,
  exchangeTransform,
} from '../../transform'

export const addExchange: MutationResolvers['addExchange'] = async (
  _,
  {
    input: {
      ownerId,
      accrualDate,
      origin: { entries: originEntries, treasuryBookId: originTreasuryBookId },
      destination: {
        entries: destinationEntries,
        treasuryBookId: destinationTreasuryBookId,
      },
    },
  },
  { dataSources: { prisma } },
) => {
  const exchange = await prisma.exchange.createExchange({
    ownerId,
    origin: addExchangeTransactionTransform({
      accrualDate,
      treasuryBookId: originTreasuryBookId,
      entries: originEntries,
    }),
    destination: addExchangeTransactionTransform({
      accrualDate,
      treasuryBookId: destinationTreasuryBookId,
      entries: destinationEntries,
    }),
  })

  return exchangeTransform(exchange)
}
