import { EntryTable } from "@/components/entry";
import { Hero, Layout } from "@/components/layout"
import { TransactionDescriptionList } from "@/components/transaction";

const Page: React.FC = () => {
  return (
    <Layout prev="/transaction">
      <Hero
        header="Transaction Detail"
        subheader="View and edit the information of transaction."
      />
      <TransactionDescriptionList />
      <EntryTable omitTransactionId />
    </Layout>
  );
}

export default Page;