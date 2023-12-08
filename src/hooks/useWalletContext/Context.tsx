import { Wallet } from "@/api/graphql";
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, createContext } from "react";

export type WalletContextState = {
  /**
   * Current wallet id
   */
  currentWalletId?: string;
  /**
   * All wallets
   */
  wallets?: Wallet[];
  /**
   * Loading
   */
  loading?: boolean;
  /**
   * Error
   */
  error?: ApolloError;
};

export type SetWalletContextState = {
  setCurrentWalletId?: Dispatch<SetStateAction<WalletContextState['currentWalletId']>>;
};

const defaultWalletContextState: WalletContextState = {
  // Everything default to `undefined`
};

const defaultSetWalletContextState: SetWalletContextState = {
  // Everything default to `undefined`
};

export const WalletContext = createContext<
  [WalletContextState, SetWalletContextState]
>([
  defaultWalletContextState, defaultSetWalletContextState
]);