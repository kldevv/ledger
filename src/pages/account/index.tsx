import { AccountDashboard } from '@/components/account';
import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('account');

  return (
    <Layout prev="/">
      <PageHeader
        title={t('page.index.title')}
        subtitle={t('page.index.subtitle')}
        link={{
          href: '/account/add',
          label: t('page.index.link'),
        }}
      />
      <AccountDashboard />
    </Layout>
  );
};

export default Page;
