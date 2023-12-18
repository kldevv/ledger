import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('transaction');

  return (
    <Layout prev="/transaction">
      <PageHeader
        title={t('page.record.index.title')}
        subtitle={t('page.record.index.subtitle')}
      />
    </Layout>
  );
};

export default Page;
