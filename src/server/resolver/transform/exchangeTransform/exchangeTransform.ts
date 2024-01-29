import { Exchange, Transaction } from '@prisma/client'

export type ExchangeTransformProps = Exchange & {
  /**
   * Relational field: transactions
   */
  transactions: Array<Transaction>
}

export const exchangeTransform = ({
  transactions,
  ...exchange
}: ExchangeTransformProps) => {
  return {
    ...exchange,
    origin: transactions[0] ?? null,
    destination: transactions[1] ?? null,
  }
}
