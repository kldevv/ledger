import { CategoryTable } from '@/components/category';
import { PageHeader, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader title='Categories' subtitle='All the categories of the selected vault.'/>
      <CategoryTable />
    </Layout>
  );
};

export default Page;
