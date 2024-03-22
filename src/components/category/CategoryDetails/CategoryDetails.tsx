import { useTranslation } from 'next-i18next'

import { useCategoryDetailQuery } from '@/api/graphql'
import { AccountTable } from '@/components/account'
import { CategoryDescriptionList } from '@/components/category'
import { Card } from '@/components/core'
import { EntryFilteredTable } from '@/components/entry'
import { useResolvedQuery } from '@/hooks'
import { useCurrentBranch } from '@/components/core/hooks'

export const CategoryDetails: React.FC = () => {
  const { t } = useTranslation('accountGroup')
  const id = useResolvedQuery('id')

  const [currentBranch] = useCurrentBranch()

  const { data } = useCategoryDetailQuery({
    variables: {
      categoryInput: {
        id: id ?? '',
      },
      entriesInput: {
        categoryId: id,
        treasuryBookId: currentBranch?.id ?? '',
      },
      accountsInput: {
        categoryId: id,
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: id == null || !currentBranch?.id,
  })

  return (
    <div>
      <CategoryDescriptionList data={data?.category} />
      <div className="mt-12 flex flex-col space-y-3">
        <h3 className="text-dark-shades font-semibold">
          {t`CategoryDetail.title.accounts`}
        </h3>
        <Card>
          <AccountTable data={data?.accounts ?? []} />
        </Card>
      </div>
      <div className="mt-12 flex flex-col space-y-3">
        <h3 className="text-dark-shades font-semibold">
          {t`CategoryDetail.title.entries`}
        </h3>
        <EntryFilteredTable data={data?.entries ?? []} />
      </div>
    </div>
  )
}
