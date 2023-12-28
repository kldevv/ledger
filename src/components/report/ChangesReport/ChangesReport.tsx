import { useGetMonthlyReportsQuery } from '@/api/graphql';
import { useVaultContext } from '@/hooks';
import { ReportTable, ReportTableData } from '..';

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

  return <ReportTable data={mockData} />;
};

const mockData: ReportTableData[] = [
  {
    name: 'level1',
    rows: [
      {
        name: 'level2',
        rows: [{ name: 'level3', rows: [] }],
      },
    ],
  },
  {
    name: 'random',
    rows: []
  }
];
