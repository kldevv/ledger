import { EntryTable } from '@/components/entry';
import { PageHeader, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader
        title="Entries"
        subtitle="All entries for the currently selected vault."
      />
      <EntryTable/>
    </Layout>
  );
};

export default Page;
