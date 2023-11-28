import { Layout } from "@/components/layout"
import { TransactionTable } from "@/components/transaction"


const TransactionPage = () => {
	return (
    <Layout>
      <div className="p-2">
        <TransactionTable />
      </div>
    </Layout>
  );
}

TransactionPage

export default TransactionPage