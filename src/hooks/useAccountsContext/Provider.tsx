import { useAccountsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { AccountsContext } from './Context'

export interface AccountsContextProviderProps {
  /**
   * Children component
   */
  children: React.ReactNode
}

export const AccountsContextProvider: React.FC<
  AccountsContextProviderProps
> = ({ children }) => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const result = useAccountsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return (
    <AccountsContext.Provider value={{ ...result }}>
      {children}
    </AccountsContext.Provider>
  )
}
