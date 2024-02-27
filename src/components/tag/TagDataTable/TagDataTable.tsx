import { useTagsQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { TagTable } from '@/components/tag'
import { useTreasuryBookContext } from '@/hooks'

export const TagDataTable: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data: { tags } = {} } = useTagsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return (
    <Card>
      <TagTable data={tags ?? []} />
    </Card>
  )
}
