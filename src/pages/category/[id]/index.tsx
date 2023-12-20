import { CategoryDetail } from '@/components/category';
import { PageHeader, Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('category');
  const router = useRouter();

  return (
    <Layout prev={'/category'}>
      <PageHeader
        title={t('page.[id].index.title')}
        subtitle={t('page.[id].index.subtitle')}
        link={{
          label: t('page.[id].index.link'),
          href: {
            pathname: '/category/[id]/edit',
            query: {
              id: router.query.id
            }
          }
        }}
      />
      <CategoryDetail />
    </Layout>
  );
};

export default Page;
