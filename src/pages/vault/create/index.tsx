import { PageHeader, Layout } from '@/components/layout';
import { CreateVaultForm } from '@/components/vault';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t }= useTranslation('vault')

  return (
    <Layout prev={'/vault'}>
      <div className="flex flex-col gap-y-4">
        <PageHeader
          title={t('page.create.index.title')}
          subtitle={t('page.create.index.subtitle')}
        />
        <CreateVaultForm />
      </div>
    </Layout>
  );
};

export default Page;
