import { useGetMonthlyAmountChangesDashboardQuery } from '@/api/graphql'
import { Layout, PageHeader } from '@/components/layout'
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
    </Layout>
  )
}

export default Page
