import { PageHeader, Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { UpdateAccountForm } from '@/components/account';

const Page: React.FC = () => {
  const { t } = useTranslation('account');
  const router = useRouter();

  return (
    <Layout
      prev={{
        pathname: '/account/[id]',
        query: {
          id: router.query.id,
        },
      }}
    >
      <PageHeader
        title={t('page.[id].edit.index.title')}
        subtitle={t('page.[id].edit.index.subtitle')}
      />
      <UpdateAccountForm />
    </Layout>
  );
};

export default Page;
