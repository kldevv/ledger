import { AccountDetail } from '@/components/account';
import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('account')

  return (
    <Layout prev="/account">
      <PageHeader
        title={t('page.[id].index.title')}
        subtitle={t('page.[id].index.subtitle')}
      />
      <AccountDetail />
    </Layout>
  );
};

export default Page;
