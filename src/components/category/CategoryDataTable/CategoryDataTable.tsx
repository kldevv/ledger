import { useGetCategoriesQuery } from '@/api/graphql'
import { CategoryTable } from '@/components/category'
import { Card } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

export const CategoryDataTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: selectedTreasuryBookId == null,
  })

  return (
    <Card>
      <CategoryTable data={data?.getCategories ?? []} />
    </Card>
  )
}
