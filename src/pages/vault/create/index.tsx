import { PageHeader, Layout } from '@/components/layout';
import { InsertVaultForm } from '@/components/vault';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('vault');

  return (
    <Layout prev={'/vault'}>
      <PageHeader
        title={t('page.create.index.title')}
        subtitle={t('page.create.index.subtitle')}
      />
      <InsertVaultForm />
    </Layout>
  );
};

export default Page;
