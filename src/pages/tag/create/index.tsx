import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('tag');

  return (
    <Layout prev="/tag">
      <PageHeader
        title={t('page.create.index.title')}
        subtitle={t('page.create.index.subtitle')}
      />
    </Layout>
  );
};

export default Page;
