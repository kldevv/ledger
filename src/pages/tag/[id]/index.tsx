import { Layout, PageHeader } from '@/components/layout';
import { TagDetail } from '@/components/tag';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('tag')

  return (
    <Layout prev="/tag">
      <PageHeader
        title={t('page.[id].index.title')}
        subtitle={t('page.[id].index.subtitle')}
        link={{
          href: '/tag/create',
          label: t('page.[id].index.link')
        }}
      />
      <TagDetail />
    </Layout>
  );
};

export default Page;
