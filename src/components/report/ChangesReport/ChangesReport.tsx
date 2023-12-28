import { useGetMonthlyReportsQuery } from '@/api/graphql';
import { useVaultContext } from '@/hooks';
import { ReportTable } from '..';

export const ChangesReport: React.FC = () => {
  const [{ curVaultId }] = useVaultContext();

  const { data, error } = useGetMonthlyReportsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        year: 2023,
      },
    },
    skip: curVaultId == null,
  });

  console.log(data, error);

  return <ReportTable reportData={data?.getMonthlyReports ?? []} />;
};