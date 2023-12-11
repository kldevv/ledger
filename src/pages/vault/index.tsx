import { Layout } from '@/components/layout';
import { AddVaultCard, VaultRadioCards } from '@/components/vault';

const Page: React.FC = () => {
  return (
    <Layout prev="/">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-dark-shades font-extrabold text-3xl">Vaults</h1>
        <p className="text-darkMidGray text-base">
          Switch to a different vault or create a new one.
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <VaultRadioCards />
        <AddVaultCard />
      </div>
    </Layout>
  );
};

export default Page;
