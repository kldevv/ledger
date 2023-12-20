import { Layout, PageHeader } from '@/components/layout';
import { TagDetail } from '@/components/tag';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('tag')
  const router = useRouter()

  return (
    <Layout prev="/tag">
      <PageHeader
        title={t('page.[id].index.title')}
        subtitle={t('page.[id].index.subtitle')}
        link={{
          href: {
            pathname: '/tag/[id]/edit',
            query: {
              id: router.query.id,
            },
          },
          label: t('page.[id].index.link'),
        }}
      />
      <TagDetail />
    </Layout>
  );
};

export default Page;
