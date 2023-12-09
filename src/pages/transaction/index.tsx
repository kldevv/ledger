import { Layout } from "@/components/layout"
import { TransactionTable } from "@/components/transaction"

const Page: React.FC = () => {
  return (
    <Layout prev="/">
      <h1 className="text-darkShades font-extrabold text-3xl">Transactions</h1>
      <p className="text-darkMidGray text-base">
        All transactions for the currently selected wallet.
      </p>
      <div>
        <TransactionTable />
      </div>
    </Layout>
  );
};

export default Page