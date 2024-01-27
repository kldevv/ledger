import { useGetAccountsQuery } from '@/api/graphql'
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

  const result = useGetAccountsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId,
      },
    },
  })

  return (
    <AccountsContext.Provider value={{ result }}>
      {children}
    </AccountsContext.Provider>
  )
}
