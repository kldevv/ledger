import {
  GetAccountTopologyQuery,
  ReportData,
  useGetAccountTopologyQuery,
} from '@/api/graphql';
import { Button, ExpandableTable } from '@/components/common';
import { useVaultContext } from '@/hooks';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { createColumnHelper } from '@tanstack/react-table';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

type Data = Exclude<
  GetAccountTopologyQuery['getAccountTopology'],
  undefined | null
>[number];
type ReportTableData = Omit<Data, 'children'> & {
  children: ReportTableData[];
};

export interface ReportTableProps {
  /**
   * Report data
   */
  reportData: ReportData[];
  /**
   * Start year
   */
  startYear?: number;
  /**
   * Last month
   */
  months?: number;
}

const columnHelper = createColumnHelper<ReportTableData>();

const getExpandedData = (row: ReportTableData) => row.children;

export const ReportTable: React.FC<ReportTableProps> = ({
  reportData,
  startYear = new Date().getFullYear(),
  months = 12,
}) => {
  const { t } = useTranslation('account');

  const [{ curVaultId }] = useVaultContext();

  const { data: topology } = useGetAccountTopologyQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  const reportDataMappings = useMemo(() => {
    const mappings = new Map<string, ReportData>()

    reportData.forEach((data) => {
      mappings.set(data.encode, data)
    })

    return mappings;
  }, [reportData])

  console.log(reportDataMappings);

  const colDefs = [
    columnHelper.display({
      id: 'expanded',
      cell: ({ row }) =>
        row.getCanExpand() ? (
          <Button onClick={row.getToggleExpandedHandler()}>
            {row.getIsExpanded() ? (
              <ChevronDownIcon className="w-3 h-3" />
            ) : (
              <ChevronRightIcon className="w-3 h-3" />
            )}
          </Button>
        ) : null,
    }),
    columnHelper.accessor('name', {
      header: t('ReportTable.header.name'),
      cell: ({ getValue, row }) => (
        <span
          className={classNames(
            row.depth == 1
              ? 'ml-4'
              : row.depth == 2
              ? 'ml-8 text-dark-shades'
              : ''
          )}
        >
          {getValue()}
        </span>
      ),
    }),
    columnHelper.group({
      header: '1',
      columns: [
        columnHelper.accessor('id', {
          id: '213',
          cell: ({ getValue }) =>
            reportDataMappings.get(`${getValue()}::${2023}::${11}`)?.debit ?? 0,
        }),
        columnHelper.accessor('id', {
          id: '456',
          cell: ({ getValue }) =>
            reportDataMappings.get(`${getValue()}::${2023}::${11}`)?.credit ??
            0,
        }),
      ],
    }),
  ];

  return (
    <ExpandableTable
      data={topology?.getAccountTopology ?? []}
      colDefs={colDefs}
      getExpandedData={getExpandedData}
    />
  );
};
