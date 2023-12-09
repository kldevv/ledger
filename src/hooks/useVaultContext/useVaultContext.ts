import { useContext } from "react";
import { VaultContext } from "./Context";

/**
 * Get vault context
 */
export const useVaultContext = () => useContext(VaultContext)