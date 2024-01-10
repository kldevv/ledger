import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetCategoryDetailQuery } from '@/api/graphql'
import { AccountTable } from '@/components/account'
import { CategoryDescriptionList } from '@/components/category'
import { EntryTable } from '@/components/entry'
import { useVaultContext } from '@/hooks'

export const CategoryDetail: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('category')

  const { id } = router.query
  const categoryId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const [{ curVaultId }] = useVaultContext()

  const { data } = useGetCategoryDetailQuery({
    variables: {
      getCategoryInput: {
        id: categoryId ?? '',
      },
      getEntriesInput: {
        categoryId,
        vaultId: curVaultId ?? '',
      },
      getAccountsInput: {
        categoryId,
      },
    },
    skip: categoryId == null || curVaultId == null,
  })

  return (
    data?.getCategory && (
      <div>
        <CategoryDescriptionList
          data={{
            ...data?.getCategory,
          }}
        />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('CategoryDetail.title.accounts')}
        </h3>
        <AccountTable data={data?.getAccounts} />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('CategoryDetail.title.entries')}
        </h3>
        <EntryTable data={data?.getEntries} />
      </div>
    )
  )
}
