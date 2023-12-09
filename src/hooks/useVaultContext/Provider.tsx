import { useMemo, useState } from "react"
import { SetVaultContextState, VaultContext, VaultContextState } from "./Context"
import { useGetAllVaultsQuery } from '@/api/graphql'

export type VaultContextProviderProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
};

export const VaultContextProvider: React.FC<VaultContextProviderProps> = ({ children }) => {
  const [curVaultId, setCurVaultId] =
      useState<VaultContextState['curVaultId']>(undefined);
      
  const {
    data: { getAllVaults } = {},
    loading,
    error,
  } = useGetAllVaultsQuery({
    variables: {
      ownerId: '000',
    },
    onCompleted: (data) => {
      setCurVaultId(data.getAllVaults?.[0].id);
    }
  });

  const contextState = useMemo<VaultContextState>(
    () => ({
      vaults: getAllVaults,
      curVaultId,
      loading,
      error,
    }),
    [getAllVaults, curVaultId, loading, error]
  );
  const setContextState = useMemo<SetVaultContextState>(
    () => ({
      setCurVaultId,
    }),
    [setCurVaultId]
  );

  return (
    <VaultContext.Provider value={[contextState, setContextState]}>
      {children}
    </VaultContext.Provider>
  );
}