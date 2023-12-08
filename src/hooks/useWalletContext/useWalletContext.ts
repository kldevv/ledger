import { useContext } from "react";
import { WalletContext } from "./Context";

/**
 * Get wallet context
 */
export const useWalletContext = () => useContext(WalletContext)