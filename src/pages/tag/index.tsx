import { Hero, Layout } from '@/components/layout';
import { TagTable } from '@/components/tag/TagTable';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('tag')

  return (
    <Layout prev={'/'}>
      <Hero title={t('page.title')} subtitle={t('page.subtitle')} />
      <TagTable />
    </Layout>
  );
};

export default Page;
