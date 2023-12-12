import { AccountTable } from '@/components/account';
import { Hero, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout prev="/">
      <Hero title="Accounts" subtitle={"All accounts of the currently selecte vault."}/>
      <AccountTable />
    </Layout>
  );
};

export default Page;
