import { Hero, Layout } from "@/components/layout"
import { TransactionDetail } from "@/components/transaction";

const Page: React.FC = () => {
  return (
    <Layout prev="/transaction">
      <Hero
        title="Transaction Detail"
        subtitle="View and edit the information of transaction."
      />
      <TransactionDetail />
    </Layout>
  );
}

export default Page;