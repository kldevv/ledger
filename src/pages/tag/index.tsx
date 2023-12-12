import { Hero, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout prev={"/"}>
      <Hero title='Tags' subtitle='All the tags of the current vault.'/>
    </Layout>
  );
};

export default Page;
