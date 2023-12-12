import { CategoryTable } from '@/components/category';
import { Hero, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout>
      <Hero title='Categories' subtitle='All the categories of the selected vault.'/>
      <CategoryTable />
    </Layout>
  );
};

export default Page;
