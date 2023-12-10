import { Hero, Layout } from "@/components/layout"
import { TransactionTable } from "@/components/transaction"

const Page: React.FC = () => {
  return (
    <Layout prev="/">
      <Hero
        header="Transactions"
        subheader="All transactions for the currently selected vault."
      />
      <TransactionTable />
    </Layout>
  );
};

export default Page