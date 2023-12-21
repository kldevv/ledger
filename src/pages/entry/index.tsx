import { EntryDashboard } from '@/components/entry';
import { PageHeader, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout prev="/">
      <PageHeader
        title="Entries"
        subtitle="All entries for the currently selected vault."
      />
      <EntryDashboard />
    </Layout>
  );
};

export default Page;
