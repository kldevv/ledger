import {
  GetAccountTopologyQuery,
  useGetAccountTopologyQuery,
} from '@/api/graphql';
import { ExpandableTable } from '@/components/common';
import { useVaultContext } from '@/hooks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import classNames from 'classnames';
import { useMemo } from 'react';

type Data = Exclude<
  GetAccountTopologyQuery['getAccountTopology'],
  undefined | null
>[number];

type AccountTopologyTableData = Omit<Data, 'children'> & {
  children: AccountTopologyTableData[];
};

export const columnHelper = createColumnHelper<AccountTopologyTableData>();

export const getExpandedData = (row: AccountTopologyTableData) => row.children;

export interface AccountTopologyTableProps {
  /**
   * Report data
   */
  cols: ColumnDef<AccountTopologyTableData>[];
}

export const AccountTopologyTable: React.FC<AccountTopologyTableProps> = ({
  cols,
}) => {
  const [{ curVaultId }] = useVaultContext();

  const { data: topology } = useGetAccountTopologyQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: '',
        cell: ({ getValue, row }) => (
          <span
            className={classNames(
              'whitespace-nowrap',
              row.depth == 1
                ? 'ml-4 text-gray'
                : row.depth == 2
                ? 'ml-8 text-dark-shades'
                : undefined
            )}
          >
            {getValue()}
          </span>
        ),
      }),
      ...cols,
    ],
    [cols]
  );

  return (
    <ExpandableTable
      data={topology?.getAccountTopology ?? []}
      colDefs={colDefs}
      getExpandedData={getExpandedData}
    />
  );
};
