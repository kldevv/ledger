import { EntryTable } from '@/components/entry';
import { PageHeader, Layout } from '@/components/layout';
import { TransactionDescriptionList } from '@/components/transaction';

const Page: React.FC = () => {
  return (
    <Layout prev="/account">
      <PageHeader
        title="Transaction Detail"
        subtitle="View and edit the information of transaction."
      />
      <TransactionDescriptionList />
      <EntryTable />
    </Layout>
  );
};

export default Page;
