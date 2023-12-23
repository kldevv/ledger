import { PageHeader, Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { UpdateTagForm } from '@/components/tag/UpdateTagForm';

const Page: React.FC = () => {
  const { t } = useTranslation('tag');
  const router = useRouter()

  return (
    <Layout
      prev={{
        pathname: '/tag/[id]',
        query: {
          id: router.query.id,
        },
      }}
    >
      <PageHeader
        title={t('page.[id].edit.index.title')}
        subtitle={t('page.[id].edit.index.subtitle')}
      />
      <UpdateTagForm />
    </Layout>
  );
};

export default Page;
