import { useSession } from 'next-auth/react'

import { useLinksQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core/presentationals'

import { useLinksTableCol } from '../../hooks'

export const LinksTable: React.FC = () => {
  const colDefs = useLinksTableCol()
  const { data: session } = useSession()
  const { data, loading } = useLinksQuery({
    variables: {
      input: {
        userId: session?.user.id ?? '',
      },
    },
    skip: session?.user.id == null,
  })

  return (
    <Card>
      <Table colDefs={colDefs} data={data?.links ?? []} loading={loading} />
    </Card>
  )
}
