import { useAccountsQuery } from '@/api/graphql'
import { Card } from '@/components/core'

import { AccountTable } from '..'
import { useCurrentBranch } from '@/components/core/hooks'

export const AccountDataTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()
  const { data } = useAccountsQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: !currentBranch?.id,
  })

  return (
    <Card className="w-full">
      <AccountTable data={data?.accounts ?? []} />
    </Card>
  )
}
