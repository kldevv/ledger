import { useGetTagsQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { TagTable } from '@/components/tag'
import { useTreasuryBookContext } from '@/hooks'

export const TagDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetTagsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Card>
      <TagTable data={data?.tags ?? []} />
    </Card>
  )
}
