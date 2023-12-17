import { AccountTable } from '@/components/account';
import { PageHeader, Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout prev="/">
      <PageHeader title="Accounts" subtitle={"All accounts of the currently selecte vault."}/>
      <AccountTable />
    </Layout>
  );
};

export default Page;
