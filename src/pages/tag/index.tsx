import { PageHeader, Layout } from '@/components/layout';
import { TagDashboard } from '@/components/tag';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('tag')

  return (
    <Layout prev={'/'}>
      <PageHeader title={t('page.index.title')} subtitle={t('page.index.subtitle')} />
      <TagDashboard />
    </Layout>
  );
};

export default Page;
