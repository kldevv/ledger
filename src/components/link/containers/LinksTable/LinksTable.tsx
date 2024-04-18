import { useLinksQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core/presentationals'

import { useLinksTableCol } from '../../hooks'

export const LinksTable: React.FC = () => {
  const colDefs = useLinksTableCol()
  const { data, loading } = useLinksQuery({
    variables: {
      input: {
        userId: process.env.NEXT_PUBLIC_USER_ID ?? '',
      },
    },
  })

  return (
    <Card>
      <Table colDefs={colDefs} data={data?.links ?? []} loading={loading} />
    </Card>
  )
}
