import { createContext } from 'react'

import type { GetAccountsQueryResult } from '@/api/graphql'

export type AccountsContext = Pick<
  GetAccountsQueryResult,
  'data' | 'loading' | 'error'
>

export const AccountsContext = createContext<AccountsContext>({
  data: undefined,
  loading: true,
})
