import { createContext } from 'react'

import type { AccountsQueryResult } from '@/api/graphql'

export type AccountsContext = Pick<
  AccountsQueryResult,
  'data' | 'loading' | 'error'
>

export const AccountsContext = createContext<AccountsContext>({
  data: undefined,
  loading: true,
})
