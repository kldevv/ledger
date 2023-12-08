import { useMemo, useState } from "react"
import { SetWalletContextState, WalletContext, WalletContextState } from "./Context"
import { useGetAllWalletsQuery } from '@/api/graphql'

export type WalletContextProviderProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
};

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  const [curWalletId, setCurWalletId] =
      useState<WalletContextState['curWalletId']>(undefined);
      
  const {
    data: { getAllWallets } = {},
    loading,
    error,
  } = useGetAllWalletsQuery({
    variables: {
      ownerId: '000',
    },
    onCompleted: (data) => {
      setCurWalletId(data.getAllWallets?.[0].id);
    }
  });

  const contextState = useMemo<WalletContextState>(
    () => ({
      wallets: getAllWallets,
      curWalletId,
      loading,
      error,
    }),
    [getAllWallets, curWalletId, loading, error]
  );
  const setContextState = useMemo<SetWalletContextState>(
    () => ({
      setCurWalletId,
    }),
    [setCurWalletId]
  );

  return (
    <WalletContext.Provider value={[contextState, setContextState]}>
      {children}
    </WalletContext.Provider>
  );
}