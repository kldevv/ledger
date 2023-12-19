import { PageHeader, Layout } from '@/components/layout';
import { AddTransactionForm } from '@/components/transaction';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('transaction');

  return (
    <Layout prev="/transaction">
      <PageHeader
        title={t('page.record.index.title')}
        subtitle={t('page.record.index.subtitle')}
      />
      <AddTransactionForm />
    </Layout>
  );
};

export default Page;
