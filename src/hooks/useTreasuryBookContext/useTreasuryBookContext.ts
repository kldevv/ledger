import { useContext } from 'react'

import { TreasuryBookContext } from './TreasuryBookContext'

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
