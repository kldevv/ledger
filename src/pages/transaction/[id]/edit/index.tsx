import { PageHeader, Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { UpdateTransactionForm } from '@/components/transaction';

const Page: React.FC = () => {
  const { t } = useTranslation('transaction');
  const router = useRouter();

  return (
    <Layout
      prev={{
        pathname: '/transaction/[id]',
        query: {
          id: router.query.id,
        },
      }}
    >
      <PageHeader
        title={t('page.[id].edit.index.title')}
        subtitle={t('page.[id].edit.index.subtitle')}
      />
      <UpdateTransactionForm />
    </Layout>
  );
};

export default Page;
