import type { MutationResolvers } from '@/api/graphql'
import {
  transformAddExchangeTransactionInput,
  transformExchange,
} from '../../transform'

export const addExchange: MutationResolvers['addExchange'] = async (
  _,
  {
    input: {
      ownerId,
      accrualDate,
      note,
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
    origin: transformAddExchangeTransactionInput({
      accrualDate,
      treasuryBookId: originTreasuryBookId,
      entries: originEntries,
      note,
    }),
    destination: transformAddExchangeTransactionInput({
      accrualDate,
      treasuryBookId: destinationTreasuryBookId,
      entries: destinationEntries,
      note,
    }),
  })

  return transformExchange(exchange)
}
