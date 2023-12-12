import { EntryTable } from '@/components/entry';
import { Hero, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout>
      <Hero
        title="Entries"
        subtitle="All entries for the currently selected vault."
      />
      <EntryTable/>
    </Layout>
  );
};

export default Page;
