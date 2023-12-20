import { PageHeader, Layout } from "@/components/layout"
import { TransactionDashboard } from "@/components/transaction"
import { useTranslation } from "next-i18next";

const Page: React.FC = () => {
  const { t } = useTranslation('transaction')

  return (
    <Layout prev="/">
      <PageHeader
        title={t('page.index.title')}
        subtitle={t('page.index.subtitle')}
        link={{
          href: '/transaction/record',
          label: t('page.index.link'),
        }}
      />
      <TransactionDashboard />
    </Layout>
  );
};

export default Page