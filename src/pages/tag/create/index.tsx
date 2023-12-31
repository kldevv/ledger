import { PageHeader, Layout } from '@/components/layout';
import { InsertTagForm } from '@/components/tag';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('tag');

  return (
    <Layout prev="/tag">
      <PageHeader
        title={t('page.create.index.title')}
        subtitle={t('page.create.index.subtitle')}
      />
      <InsertTagForm />
    </Layout>
  );
};

export default Page;
