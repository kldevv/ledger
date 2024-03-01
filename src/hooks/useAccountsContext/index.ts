import { useContext } from 'react'

import { AccountsContext } from './context'

export * from './provider'

export const useAccountsContext = () => {
  const value = useContext(AccountsContext)

  if (value == null) {
    throw Error('useAccountsContext must be used within the provider')
  }

  return value
}
