import { useGetCategoriesQuery } from '@/api/graphql'
import { useVaultContext } from '@/hooks'
import { CategoryTable } from '..'

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
