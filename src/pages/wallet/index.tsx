import { Layout } from '@/components/layout';
import { WalletRadioCards } from '@/components/wallet';

const Page: React.FC = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-y-4'>
        <h1 className="text-darkShades font-extrabold text-3xl">Wallets</h1>
        <p className="text-darkMidGray text-base">
          Switch to a different wallet or create a new one.
        </p>
      </div>
      <div>
        <WalletRadioCards />
      </div>
    </Layout>
  );
};

export default Page;
