import { useAccountBalanceQuery } from '@/api/graphql'
import { Card } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'

import { AccountBalanceTableColumn } from '../..'

export const AccountBalanceTable = () => {
  const [currentBranch] = useCurrentBranch()

  const { data } = useAccountBalanceQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: !currentBranch?.id,
  })

  return (
    <Card>
      <AccountBalanceTableColumn data={data?.accountBalance ?? []} />
    </Card>
  )
}
