import { Transaction, Entry } from "@prisma/client";
import { Optional } from "@/types";

/**
 * createTransaction
 */
export type CreateTransactionArgs = Pick<Transaction, 'title' | 'accruedDate'> & {
  'entries': Pick<Entry, 'settledDate' | 'debit' | 'credit' | 'accountId' | 'status' | 'memo' | 'userId' >
}
export type CreateTransactionReturns = Transaction & {
  'entries': Pick<Entry, 'settledDate' | 'debit' | 'credit' | 'accountId' | 'status' | 'memo' | 'userId'>
}

/**
 * getTransactions
 */
export type GetTransactionsArgs = Partial<Pick<Transaction, 'id' | 'title' | 'accruedDate'>> & {
  'entries': Partial<Pick<Entry, 'settledDate' | 'debit' | 'credit' | 'accountId' | 'status' | 'memo' | 'userId'>>
}
export type GetTransactionsReturns = (Pick<Transaction, 'id' | 'title' | 'accruedDate'> & {
  'entries': Pick<Entry, 'settledDate' | 'debit' | 'credit' | 'accountId' | 'status' | 'memo' | 'userId' | 'id' >[]
})[]

/**
 * updateTransaction
 */
export type UpdateTransactionArgs = Optional<Pick<Transaction, 'id' | 'title' | 'accruedDate'>, 'title' | 'accruedDate'> & {
  'entries'?: Pick<Entry, 'settledDate' | 'debit' | 'credit' | 'accountId' | 'status' | 'memo' | 'userId'>[]
}

/**
 * deleteTransaction
 */
export type DeleteTransactionArgs = Pick<Transaction, 'id'>