import { EntryTable } from '@/components/entry';
import { Hero, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout>
      <Hero
        header="Entries"
        subheader="All entries for the currently selected vault."
      />
      <EntryTable />
    </Layout>
  );
};

export default Page;
