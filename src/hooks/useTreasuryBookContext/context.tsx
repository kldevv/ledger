import type { Dispatch, SetStateAction } from 'react'

import { createContext, useContext } from 'react'

import type { TreasuryBooksQuery } from '@/api/graphql'
import type { ApolloError } from '@apollo/client'

export type TreasuryBookContext = {
  /**
   * Owner id
   */
  ownerId: string
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
  data?: TreasuryBooksQuery
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

/**
 * Hook for the treasury books data and the selected treasury book id
 */
export const useTreasuryBookContext = () => {
  const context = useContext(TreasuryBookContext)

  if (context == null) {
    throw Error(
      'useTreasuryBookContext should be used inside the TreasuryBookContext.Provider',
    )
  }

  return context
}
