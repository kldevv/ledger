import { useCategoriesQuery } from '@/api/graphql'
import { CategoryTable } from '@/components/category'
import { Card } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'

export const CategoryDataTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()

  const { data: { categories } = {} } = useCategoriesQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: !currentBranch?.id,
  })

  return (
    <Card>
      <CategoryTable data={categories ?? []} />
    </Card>
  )
}
