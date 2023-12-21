import { PageHeader, Layout } from '@/components/layout';
import { InsertTransactionForm } from '@/components/transaction';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('transaction');

  return (
    <Layout prev="/transaction">
      <PageHeader
        title={t('page.record.index.title')}
        subtitle={t('page.record.index.subtitle')}
      />
      <InsertTransactionForm />
    </Layout>
  );
};

export default Page;
