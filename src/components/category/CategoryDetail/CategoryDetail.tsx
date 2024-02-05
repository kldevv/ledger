import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetCategoryDetailQuery } from '@/api/graphql'
import { AccountTable } from '@/components/account'
import { CategoryDescriptionList } from '@/components/category'
import { Card } from '@/components/common'
import { EntryFilteredTable } from '@/components/entry'
import { useTreasuryBookContext } from '@/hooks'

export const CategoryDetail: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('category')

  const { id } = router.query
  const categoryId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetCategoryDetailQuery({
    variables: {
      getCategoryInput: {
        id: categoryId ?? '',
      },
      entriesInput: {
        categoryId,
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
      getAccountsInput: {
        categoryId,
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: categoryId == null || selectedTreasuryBookId == null,
  })

  return (
    data?.getCategory && (
      <div>
        <CategoryDescriptionList
          data={{
            ...data?.getCategory,
          }}
        />
        <div className="mt-12 space-y-3 flex flex-col">
          <h3 className="font-semibold text-dark-shades">
            {t`CategoryDetail.title.accounts`}
          </h3>
          <Card>
            <AccountTable data={data?.getAccounts} />
          </Card>
        </div>
        <div className="mt-12 space-y-3 flex flex-col">
          <h3 className="font-semibold text-dark-shades">
            {t`CategoryDetail.title.entries`}
          </h3>
          <EntryFilteredTable data={data?.entries} />
        </div>
      </div>
    )
  )
}
