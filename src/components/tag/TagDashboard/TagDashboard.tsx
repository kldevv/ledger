import { useGetTagsQuery } from '@/api/graphql'
import { TagTable } from '@/components/tag'
import { useTreasuryBookContext } from '@/hooks'

export const TagDashboard: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetTagsQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
    fetchPolicy: 'cache-and-network',
  })

  return <TagTable data={data?.getTags ?? []} />
}
