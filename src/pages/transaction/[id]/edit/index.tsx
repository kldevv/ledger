import { PageHeader, Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

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
    </Layout>
  );
};

export default Page;
