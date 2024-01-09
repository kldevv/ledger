import { WalletIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useVaultContext } from '@/hooks'

import { VaultLink } from './VaultLink'

const vaultRoute = '/vault'

export const VaultStatus: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('layout')

  const [{ vaults, curVaultId, loading, error }] = useVaultContext()

  const currentVaultName = useMemo(
    () => vaults?.find((vault) => vault.id === curVaultId)?.name,
    [vaults, curVaultId],
  )

  return (
    <VaultLink
      route={vaultRoute}
      active={router.asPath.startsWith(vaultRoute)}
      loading={loading}
      error={error != null || currentVaultName == null}
    >
      <WalletIcon className="h-3 w-3 ml-2" />
      {currentVaultName ?? t`VaultStatus.fallback`}
    </VaultLink>
  )
}
