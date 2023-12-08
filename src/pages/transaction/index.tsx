import { Layout } from "@/components/layout"
import { TransactionTable } from "@/components/transaction"

const Page: React.FC = () => {
  return (
    <Layout>
      <div className="p-2">
        <TransactionTable />
      </div>
    </Layout>
  );
};

export default Page