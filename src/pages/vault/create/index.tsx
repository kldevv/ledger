import { Layout } from '@/components/layout';
import { CreateVaultForm } from '@/components/vault';

const Page: React.FC = () => {
  return (
    <Layout prev={'/vault'}>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-dark-shades font-extrabold text-3xl">Create Vault</h1>
        <p className="text-gray text-base">
          Create a new vault to help you manage transactions, categories, accounts, and tags in your chosen currency, isolated from other vaults.
        </p>
        <CreateVaultForm />
      </div>
    </Layout>
  );
};

export default Page;
