import { PageHeader, Layout } from "@/components/layout"
import { TransactionTable } from "@/components/transaction"

const Page: React.FC = () => {
  return (
    <Layout prev="/">
      <PageHeader
        title="Transactions"
        subtitle="All transactions for the currently selected vault."
      />
      <TransactionTable />
    </Layout>
  );
};

export default Page