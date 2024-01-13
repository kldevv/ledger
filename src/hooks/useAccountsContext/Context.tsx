import { createContext } from 'react'

import type { GetAccountsQueryResult } from '@/api/graphql'

export type AccountsContext = {
  /**
   * Accounts query result
   */
  result: Pick<GetAccountsQueryResult, 'data' | 'loading' | 'error'>
}

export const AccountsContext = createContext<AccountsContext>({
  result: {
    data: undefined,
    loading: true,
  },
})
