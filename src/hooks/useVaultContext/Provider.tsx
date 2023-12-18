import { useMemo, useState } from "react"
import { SetVaultContextState, VaultContext, VaultContextState } from "./Context"
import { useGetVaultsQuery } from "@/api/graphql";

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
    data,
    loading,
    error,
  } = useGetVaultsQuery({
    variables: {
      input: {
        ownerId: '000',
      }
    },
    onCompleted: (data) => {
      setCurVaultId(data.getVaults?.[0].id);
    }
  });

  const contextState = useMemo<VaultContextState>(
    () => ({
      vaults: data?.getVaults ?? [],
      curVaultId,
      loading,
      error,
    }),
    [data?.getVaults, curVaultId, loading, error]
  );
  
  const setContextState = useMemo<SetVaultContextState>(
    () => ({
      setCurVaultId,
    }),
    [setCurVaultId]
  );

  return (
    <VaultContext.Provider value={[contextState, setContextState] as const}>
      {children}
    </VaultContext.Provider>
  );
}