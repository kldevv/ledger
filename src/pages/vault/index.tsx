import { PageHeader, Layout } from '@/components/layout';
import { VaultTable } from '@/components/vault';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('vault');

  return (
    <Layout prev="/">
      <PageHeader title={t('page.index.title')} subtitle={t('page.index.subtitle')} link={{
        href: "/vault/create",
        label: t('page.index.link')
      }} />
      <VaultTable />
    </Layout>
  );
};

export default Page;
