import { AddAccountForm } from '@/components/account';
import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('account');

  return (
    <Layout prev="/account">
      <PageHeader
        title={t('page.add.index.title')}
        subtitle={t('page.add.index.subtitle')}
      />
      <AddAccountForm />
    </Layout>
  );
};

export default Page;
