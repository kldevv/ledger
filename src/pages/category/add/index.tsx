import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('category');

  return (
    <Layout prev="/category">
      <PageHeader
        title={t('page.add.index.title')}
        subtitle={t('page.add.index.subtitle')}
      />
    </Layout>
  );
};

export default Page;
