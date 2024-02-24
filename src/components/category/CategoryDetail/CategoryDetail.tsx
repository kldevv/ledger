import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useCategoryDetailQuery } from '@/api/graphql'
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

  const { data } = useCategoryDetailQuery({
    variables: {
      categoryInput: {
        id: categoryId ?? '',
      },
      entriesInput: {
        categoryId,
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
      accountsInput: {
        categoryId,
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: categoryId == null || selectedTreasuryBookId == null,
  })

  return (
    data?.category && (
      <div>
        <CategoryDescriptionList
          data={{
            ...data?.category,
          }}
        />
        <div className="mt-12 flex flex-col space-y-3">
          <h3 className="text-dark-shades font-semibold">
            {t`CategoryDetail.title.accounts`}
          </h3>
          <Card>
            <AccountTable data={data?.accounts} />
          </Card>
        </div>
        <div className="mt-12 flex flex-col space-y-3">
          <h3 className="text-dark-shades font-semibold">
            {t`CategoryDetail.title.entries`}
          </h3>
          <EntryFilteredTable data={data?.entries} />
        </div>
      </div>
    )
  )
}
