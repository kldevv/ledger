import { PageHeader, Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { UpdateCategoryForm } from '@/components/category';

const Page: React.FC = () => {
  const { t } = useTranslation('category');
  const router = useRouter();

  return (
    <Layout
      prev={{
        pathname: '/category/[id]',
        query: {
          id: router.query.id,
        },
      }}
    >
      <PageHeader
        title={t('page.[id].edit.index.title')}
        subtitle={t('page.[id].edit.index.subtitle')}
      />
      <UpdateCategoryForm />
    </Layout>
  );
};

export default Page;
