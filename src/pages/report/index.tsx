import { Layout, PageHeader } from '@/components/layout';
import { ReportDashboard } from '@/components/report';
import { useTranslation } from 'next-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation('report');

  return (
    <Layout>
      <PageHeader
        title={t('page.index.title')}
        subtitle={t('page.index.subtitle')}
      />
      <ReportDashboard />
    </Layout>
  );
};

export default Page;
