import { Exchange } from '@prisma/client'
import { TransformTransactionProps, transformTransaction } from '..'
import { Exchange as GraphqlExchange } from '@/api/graphql'

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
