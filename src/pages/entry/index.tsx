import { EntryDashboard } from '@/components/entry';
import { PageHeader, Layout } from '@/components/layout';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('entry')

  return (
    <Layout prev="/">
      <PageHeader
        title={t`page.index.title`}
        subtitle={t`page.index.subtitle`}
      />
      <EntryDashboard />
    </Layout>
  );
};

export default Page;
