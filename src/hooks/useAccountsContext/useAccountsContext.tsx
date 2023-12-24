import { useContext } from 'react';
import { AccountsContext } from './Context';

export const useAccountsContext = () => useContext(AccountsContext)
