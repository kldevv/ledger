import { useGetVaultsQuery } from '@/api/graphql'
import { Card } from '@/components/common'

import { TreasuryBookTable } from '..'

export const TreasuryBookDataTable: React.FC = () => {
  const { data } = useGetVaultsQuery({
    variables: {
      input: {
        ownerId:
          process.env.PROFILE_ID ?? 'ce4a7c81-6404-4098-a763-64550c4ec902',
      },
    },
  })

  return (
    <Card>
      <TreasuryBookTable data={data?.getVaults ?? []} />
    </Card>
  )
}
