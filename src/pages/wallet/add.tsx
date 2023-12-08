import { Layout } from '@/components/layout';

const Page: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-darkShades font-extrabold text-3xl">Create Wallet</h1>
        <p className="text-darkMidGray text-base">
          Create a new wallet to help you manage transactions, categories, accounts, and tags in your chosen currency, isolated from other wallets.
        </p>
      </div>
    </Layout>
  );
};

export default Page;
