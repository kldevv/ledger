import { Hero, Layout } from '@/components/layout';
import { CreateVaultForm } from '@/components/vault';

const Page: React.FC = () => {
  return (
    <Layout prev={'/vault'}>
      <div className="flex flex-col gap-y-4">
        <Hero
          title="Create Vault"
          subtitle="Create a new vault to help you manage transactions, categories,
          accounts, and tags in your chosen currency, isolated from other
          vaults."
        />
        <CreateVaultForm />
      </div>
    </Layout>
  );
};

export default Page;
