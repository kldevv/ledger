import { PageHeader, Layout } from '@/components/layout';
import { TransactionDetail } from '@/components/transaction';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('transaction');
  const router = useRouter();

  return (
    <Layout prev="/transaction">
      <PageHeader
        title={t('page.[id].index.title')}
        subtitle={t('page.[id].index.subtitle')}
        link={{
          href: {
            pathname: '/transaction/[id]/edit',
            query: {
              id: router.query.id,
            },
          },
          label: t('page.[id].index.link'),
        }}
      />
      <TransactionDetail />
    </Layout>
  );
};

export default Page;
