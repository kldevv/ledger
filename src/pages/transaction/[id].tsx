import { Layout } from "@/components/layout"
import { TransactionDetail } from "@/components/transaction";

const TransactionDetailPage: React.FC = () => {
  return (
    <Layout prev="/transaction">
      <div><TransactionDetail /></div>
    </Layout>
  );
}

export default TransactionDetailPage;