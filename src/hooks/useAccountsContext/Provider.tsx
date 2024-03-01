import { useAccountsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { AccountsContext } from './context'

export interface AccountsContextProviderProps {
  /**
   * Children
   */
  children: React.ReactNode
  /**
   * Override treasury book id
   */
  treasuryBookId?: string
}

export const AccountsContextProvider: React.FC<
  AccountsContextProviderProps
> = ({ children, treasuryBookId }) => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const id = treasuryBookId ?? selectedTreasuryBookId ?? ''

  const value = useAccountsQuery({
    variables: {
      input: {
        treasuryBookId: id,
      },
    },
    skip: id == null,
  })

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  )
}
