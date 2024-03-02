import { useAccountBalanceQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { AccountBalanceTableColumn } from '../..'

export const AccountBalanceTable = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useAccountBalanceQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return (
    <Card>
      <AccountBalanceTableColumn data={data?.accountBalance ?? []} />
    </Card>
  )
}
