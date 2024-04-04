import { useLinksQuery } from '@/api/graphql'
import { Table } from '@/components/core'
import { Card } from '@/components/core/presentationals'

import { useLinksTableCol } from '../../hooks'

export const LinksTable: React.FC = () => {
  const colDefs = useLinksTableCol()
  const { data } = useLinksQuery({
    variables: {
      input: {
        userId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  return (
    <Card>
      <Table colDefs={colDefs} data={data?.links ?? []} />
    </Card>
  )
}
