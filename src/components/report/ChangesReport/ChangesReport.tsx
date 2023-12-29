import { Basis, useGetMonthlyReportsQuery } from '@/api/graphql';
import { useVaultContext } from '@/hooks';
import { AccountTopologyTable } from '..';

export const ChangesReport: React.FC = () => {
  const [{ curVaultId }] = useVaultContext();

  const { data, error } = useGetMonthlyReportsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        year: 2023,
        basis: Basis.CASH
      },
    },
    skip: curVaultId == null,
  });

  return <AccountTopologyTable reportData={data?.getMonthlyReports ?? []} />;
};