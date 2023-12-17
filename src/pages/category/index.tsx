import { CategoryTable } from '@/components/category';
import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('category')

  return (
    <Layout prev="/">
      <PageHeader
        title={t('page.index.title')}
        subtitle={t('page.index.subtitle')}
        link={{
          label: t('page.index.link'),
          href: '/category/add'
        }}
      />
      <CategoryTable />
    </Layout>
  );
};

export default Page;
