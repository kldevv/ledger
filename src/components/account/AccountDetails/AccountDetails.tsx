import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useAccountDetailQuery } from '@/api/graphql'
import { AccountDescriptionList } from '@/components/account'
import { EntryFilteredTable } from '@/components/entry'
import { useCurrentBranch } from '@/components/core/hooks'

export const AccountDetails: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('account')
  const [currentBranch] = useCurrentBranch()

  const { id } = router.query
  const accountId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useAccountDetailQuery({
    variables: {
      accountInput: {
        id: accountId ?? '',
      },
      entriesInput: {
        treasuryBookId: currentBranch?.id ?? '',
        accountId: accountId,
      },
    },
    skip: accountId == null || !currentBranch?.id,
  })

  return (
    data?.account && (
      <div>
        <AccountDescriptionList
          data={{
            ...data.account,
          }}
        />
        <div className="mt-12 flex flex-col space-y-3">
          <h3 className="text-dark-shades font-semibold">
            {t`AccountDetails.title.entries`}
          </h3>
          <EntryFilteredTable data={data.entries} />
        </div>
      </div>
    )
  )
}
