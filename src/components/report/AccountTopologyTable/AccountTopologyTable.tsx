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

type AccountTopologyTableData = Omit<Data, 'children'> & {
  children: AccountTopologyTableData[];
};

export interface AccountTopologyTableProps {
  /**
   * Report data
   */
  reportData: ReportData[];
  /**
   * Start year
   */
  year?: number;
  /**
   * Last month
   */
  months?: number;
}

const columnHelper = createColumnHelper<AccountTopologyTableData>();

const getExpandedData = (row: AccountTopologyTableData) => row.children;

export const AccountTopologyTable: React.FC<AccountTopologyTableProps> = ({
  reportData,
  year = new Date().getFullYear(),
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
    const mappings = new Map<string, ReportData>();

    reportData.forEach((data) => {
      mappings.set(data.encode, data);
    });

    return mappings;
  }, [reportData]);

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
      header: t('AccountTopologyTable.header.name'),
      cell: ({ getValue, row }) => (
        <span
          className={classNames(
            row.depth == 1
              ? 'ml-4'
              : row.depth == 2
              ? 'ml-8 text-dark-shades'
              : '',
          )}
        >
          {getValue()}
        </span>
      ),
    }),
    ...Array.from({ length: 12 }).map((_, month) => {
      const dateEncode = `${year}::${month}`;

      return columnHelper.group({
        header: String(month),
        columns: [
          columnHelper.accessor('id', {
            header: 'Debit',
            id: `${dateEncode}.debit`,
            cell: ({ getValue }) =>
              reportDataMappings.get(`${getValue()}::${dateEncode}`)?.debit ??
              0,
          }),
          columnHelper.accessor('id', {
            header: 'Credit',
            id: `${dateEncode}.credit`,
            cell: ({ getValue }) =>
              reportDataMappings.get(`${getValue()}::${dateEncode}`)?.credit ??
              0,
          }),
        ],
      });
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
