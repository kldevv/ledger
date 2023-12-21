import { PageHeader, Layout } from '@/components/layout';
import { RecordTransactionForm } from '@/components/transaction';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('transaction');

  return (
    <Layout prev="/transaction">
      <PageHeader
        title={t('page.record.index.title')}
        subtitle={t('page.record.index.subtitle')}
      />
      <RecordTransactionForm />
    </Layout>
  );
};

export default Page;
