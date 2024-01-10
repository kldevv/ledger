import { useGetCategoriesQuery } from '@/api/graphql'
import { CategoryTable } from '@/components/category'
import { useVaultContext } from '@/hooks'

export const CategoryDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext()

  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  })

  return <CategoryTable data={data?.getCategories ?? []} />
}
