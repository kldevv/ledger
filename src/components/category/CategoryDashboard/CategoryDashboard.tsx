import { useGetCategoriesQuery } from '@/api/graphql'
import { CategoryTable } from '@/components/category'
import { useTreasuryBookContext } from '@/hooks'

export const CategoryDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return <CategoryTable data={data?.getCategories ?? []} />
}
