import type { Dispatch, SetStateAction } from 'react'

import { createContext } from 'react'

import type { GetVaultsQuery } from '@/api/graphql'
import type { ApolloError } from '@apollo/client'

export type TreasuryBookContext = {
  /**
   * Selected treasury book id
   */
  selectedTreasuryBookId?: string
  /**
   * Setter for selected treasury book id
   */
  setSelectedTreasuryBookId?: Dispatch<SetStateAction<string | undefined>>
  /**
   * Query data
   */
  data?: GetVaultsQuery
  /**
   * Query state
   */
  state: {
    /**
     * Loading?
     */
    loading: boolean
    /**
     * Error
     */
    error?: ApolloError
  }
}

export const TreasuryBookContext = createContext<
  TreasuryBookContext | undefined
>(undefined)
