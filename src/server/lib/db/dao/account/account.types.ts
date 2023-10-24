import { Account, Group } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";

/**
 * createAccount
 */
export type CreateAccountArgs = Pick<Account, 'name' | 'groupId'>

/**
 * getAccounts
 */
export type GetAccountsArgs = Partial<Pick<Account, 'id' | 'name' | 'groupId'>>
export type GetAccountsReturns = (Pick<Account, 'id' | 'name'> & {
  'group': Pick<Group, 'id' | 'name'>
})[]

/**
 * updateAccount
 */
export type UpdateAccountArgs = Optional<Pick<Account, 'id' | 'name' | 'groupId'>, 'name' | 'groupId'>

/**
 * deleteAccount
 */
export type DeleteAccountArgs = Pick<Account, 'id'>