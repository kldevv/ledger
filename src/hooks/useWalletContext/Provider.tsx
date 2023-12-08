import { useMemo, useState } from "react"
import { SetWalletContextState, WalletContext, WalletContextState } from "./Context"
import { useGetAllWalletsQuery } from '@/api/graphql'

export type WalletContextProviderProps = {
  /**
   * Children
   */
  children: React.ReactNode
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  const {
    data: { getAllWallets } = {},
    loading,
    error,
  } = useGetAllWalletsQuery({
    variables: {
      ownerId: '000',
    },
  });

  const [currentWalletId, setCurrentWalletId] =
    useState<WalletContextState['currentWalletId']>(getAllWallets?.[0].id);

  const contextState = useMemo<WalletContextState>(
    () => ({
      wallets: getAllWallets,
      currentWalletId,
      loading,
      error,
    }),
    [getAllWallets, currentWalletId, loading, error]
  );

  const setContextState = useMemo<SetWalletContextState>(
    () => ({
      setCurrentWalletId,
    }),
    [setCurrentWalletId]
  );

  return (
    <WalletContext.Provider value={[contextState, setContextState]}>
      {children}
    </WalletContext.Provider>
  );
}