import { useAccountBalanceQuery } from '@/api/graphql'
import { Layout, PageHeader } from '@/components/layout'
import { useTreasuryBookContext } from '@/hooks'

const Page: React.FC = () => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data: { accountBalance } = {} } = useAccountBalanceQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  console.log(accountBalance)

  return (
    <Layout>
      <PageHeader hideDescription />
    </Layout>
  )
}

export default Page
