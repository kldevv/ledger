import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetAccountDetailQuery } from '@/api/graphql'
import { AccountDescriptionList } from '@/components/account'
import { EntryTable } from '@/components/entry'
import { useVaultContext } from '@/hooks'

export const AccountDetail: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('account')
  const [{ curVaultId }] = useVaultContext()

  const { id } = router.query
  const accountId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetAccountDetailQuery({
    variables: {
      getAccountInput: {
        id: accountId ?? '',
      },
      getEntriesInput: {
        vaultId: curVaultId ?? '',
        accountId: accountId,
      },
    },
    skip: accountId == null || curVaultId == null,
  })

  return (
    data?.getAccount && (
      <div>
        <AccountDescriptionList
          data={{
            ...data?.getAccount,
          }}
        />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('AccountDetail.title.entries')}
        </h3>
        <EntryTable data={data?.getEntries} />
      </div>
    )
  )
}
