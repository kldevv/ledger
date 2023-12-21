import { GetAccountsQueryResult } from "@/api/graphql";
import { createContext } from "react";

export type AccountsContext = {
  /**
   * Accounts query result
   */
  result: Pick<GetAccountsQueryResult, 'data' | 'loading' | 'error'>
};

export const AccountsContext = createContext<AccountsContext>({
  result: {
    data: undefined,
    loading: true
  }
});