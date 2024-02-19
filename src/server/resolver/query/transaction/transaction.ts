import type { QueryResolvers } from '@/api/graphql'
import { transformTransaction } from '../../transform'

export const transaction: QueryResolvers['transaction'] = async (
  _,
  { input: { id } },
  { dataSources: { prisma } },
) => {
  const transaction = await prisma.transaction.findTransaction({ id })

  if (transaction == null) return null

  return transformTransaction(transaction)
}
