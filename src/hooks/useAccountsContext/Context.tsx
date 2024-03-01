import { createContext } from 'react'

import type { AccountsQueryResult } from '@/api/graphql'

export type AccountsContext = Pick<
  AccountsQueryResult,
  'data' | 'loading' | 'error' | 'refetch'
>

export const AccountsContext = createContext<AccountsContext | undefined>(
  undefined,
)
