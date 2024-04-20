import { useSession } from 'next-auth/react'

import { useBranchesQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core/presentationals'

import { useBranchesTableCol } from '../../hooks'

export const BranchesTable: React.FC = () => {
  const colDefs = useBranchesTableCol()
  const { data: session } = useSession()
  const { data, loading } = useBranchesQuery({
    variables: {
      input: {
        userId: session?.user.id ?? '',
      },
    },
    skip: session?.user.id == null,
  })

  return (
    <Card>
      <Table data={data?.branches ?? []} colDefs={colDefs} loading={loading} />
    </Card>
  )
}
