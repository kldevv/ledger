import { AccountDetail } from '@/components/account';
import { PageHeader, Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('account')
  const router = useRouter()

  return (
    <Layout prev="/account">
      <PageHeader
        title={t('page.[id].index.title')}
        subtitle={t('page.[id].index.subtitle')}
        link={{
          href: {
            pathname: '/account/[id]/edit',
            query: {
              id: router.query.id,
            },
          },
          label: t('page.[id].index.link'),
        }}
      />
      <AccountDetail />
    </Layout>
  );
};

export default Page;
