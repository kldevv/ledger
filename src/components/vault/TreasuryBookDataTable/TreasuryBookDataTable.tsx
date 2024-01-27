import { Card } from '@/components/common'

import { TreasuryBookTable } from '..'
import { useTreasuryBookContext } from '@/hooks'

export const TreasuryBookDataTable: React.FC = () => {
  const { data } = useTreasuryBookContext()

  return (
    <Card>
      <TreasuryBookTable data={data?.getTreasuryBooks ?? []} />
    </Card>
  )
}
