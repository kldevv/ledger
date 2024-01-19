import { useGetMonthlyAmountChangesDashboardQuery } from '@/api/graphql'
import { Card } from '@/components/common'
import { Layout, PageHeader } from '@/components/layout'
import { MonthlyAmountChangesTable } from '@/components/report'
import { useTreasuryBookContext } from '@/hooks'

const Page: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetMonthlyAmountChangesDashboardQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
        year: 2024,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  return (
    <Layout>
      <PageHeader />
      <Card>
        <MonthlyAmountChangesTable
          data={data?.getAccountMonthlyAmountChanges ?? []}
        />
      </Card>
    </Layout>
  )
}

export default Page
