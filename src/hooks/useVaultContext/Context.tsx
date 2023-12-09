import { Vault } from "@/api/graphql";
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, createContext } from "react";

export type VaultContextState = {
  /**
   * Current vault id
   */
  curVaultId?: string;
  /**
   * All vaults
   */
  vaults?: Vault[];
  /**
   * Loading
   */
  loading?: boolean;
  /**
   * Error
   */
  error?: ApolloError;
};

export type SetVaultContextState = {
  setCurVaultId?: Dispatch<SetStateAction<VaultContextState['curVaultId']>>;
};

const defaultVaultContextState: VaultContextState = {
  // Everything default to `undefined`
};

const defaultSetVaultContextState: SetVaultContextState = {
  // Everything default to `undefined`
};

export const VaultContext = createContext<
  [VaultContextState, SetVaultContextState]
>([
  defaultVaultContextState, defaultSetVaultContextState
]);