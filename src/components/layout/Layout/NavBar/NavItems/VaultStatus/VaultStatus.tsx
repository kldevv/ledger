import { VaultLink } from "./VaultLink";
import { WalletIcon } from "@heroicons/react/20/solid";
import { useVaultContext } from "@/hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";

const vaultRoute = '/vault'

export const VaultStatus: React.FC = () => {
  const router = useRouter()

  const [{ vaults, curVaultId, loading, error }] = useVaultContext()

  const currentVaultName = useMemo(
    () => vaults?.find((vault) => vault.id === curVaultId)?.name,
    [vaults, curVaultId]
  );

  return (
    <VaultLink
      route={vaultRoute}
      active={router.asPath.startsWith(vaultRoute)}
      loading={loading}
      error={error != null || currentVaultName == null}
    >
      <WalletIcon className="h-3 w-3 ml-2" />
      {currentVaultName ?? 'Vault Not Found'}
    </VaultLink>
  );
}