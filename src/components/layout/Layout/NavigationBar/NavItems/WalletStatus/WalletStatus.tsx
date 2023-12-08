import { WalletLink } from "./WalletLink";
import { WalletIcon } from "@heroicons/react/20/solid";
import { useWalletContext } from "@/hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";

const walletRoute = '/wallet'

export const WalletStatus: React.FC = () => {
  const router = useRouter()

  const [{ wallets, curWalletId, loading, error }] = useWalletContext()

  const currentWalletName = useMemo(
    () => wallets?.find((wallet) => wallet.id === curWalletId)?.name,
    [wallets, curWalletId]
  );

  return (
    <WalletLink
      route={walletRoute}
      active={router.asPath === walletRoute}
      loading={loading}
      error={error != null || currentWalletName == null}
    >
      <WalletIcon className="h-3 w-3 ml-2" />
      {currentWalletName ?? 'Wallet Not Found'}
    </WalletLink>
  );
}