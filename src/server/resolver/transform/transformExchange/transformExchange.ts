import { transformTransaction } from '..'

import type { TransformTransactionProps } from '..'
import type { Exchange as GraphqlExchange } from '@/api/graphql'
import type { Exchange } from '@prisma/client'

export type TransformExchangeProps = Exchange & {
  /**
   * Relational field: transactions
   */
  transactions: Array<TransformTransactionProps>
}

export const transformExchange = ({
  transactions,
  ...exchange
}: TransformExchangeProps): GraphqlExchange => {
  const transformedTransactions = transactions
    .slice(0, 2)
    .map(transformTransaction)

  const origin = transformedTransactions[0] ?? null
  const destination = transformedTransactions[1] ?? null

  return {
    ...exchange,
    origin,
    destination,
  }
}
