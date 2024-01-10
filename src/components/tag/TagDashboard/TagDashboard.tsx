import { useGetTagsQuery } from '@/api/graphql'
import { TagTable } from '@/components/tag'
import { useVaultContext } from '@/hooks'

export const TagDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext()

  const { data } = useGetTagsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
    fetchPolicy: 'cache-and-network',
  })

  return <TagTable data={data?.getTags ?? []} />
}
