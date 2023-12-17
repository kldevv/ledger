import { PageHeader, Layout } from '@/components/layout';
import { TransactionDetail } from '@/components/transaction';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('account')

  return (
    <Layout prev="/account">
      <PageHeader
        title={t('page.[id].index.title')}
        subtitle={t('page.[id].index.subtitle')}
      />
    </Layout>
  );
};

export default Page;
