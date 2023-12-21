import { useGetAccountsQuery } from '@/api/graphql';
import { AccountsContext } from './Context';
import { useVaultContext } from '@/hooks';

export interface AccountsContextProviderProps {
  /**
   * Children component
   */
  children: React.ReactNode;
}

export const AccountsContextProvider: React.FC<
  AccountsContextProviderProps
> = ({ children }) => {
  const [{ curVaultId }] = useVaultContext();

  const result = useGetAccountsQuery({
    variables: {
      input: {
        vaultId: curVaultId,
      },
    },
  });

  return (
    <AccountsContext.Provider value={{ result }}>
      {children}
    </AccountsContext.Provider>
  );
};
