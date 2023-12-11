import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { GetEntriesQuery, useGetEntriesQuery } from '@/api/graphql';
import { StatusChip, Table } from '@/components/common';
import { useFormatter, useVaultContext } from '@/hooks';

type EntryTableData = GetEntriesQuery['getEntries'][0]

const columnHelper = createColumnHelper<EntryTableData>();

export type EntryTableProps = {
  /**
   * Omit transaction id column
   */
  omitTransactionId?: boolean
};

export const EntryTable: React.FC<EntryTableProps> = ({ omitTransactionId = false }) => {
  const { t } = useTranslation('entry');
  const [{ curVaultId }] = useVaultContext();
  const { formatDate } = useFormatter();

  const {
    data: _,
    loading,
    error,
  } = useGetEntriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  const columns = [
    columnHelper.accessor('transactionDate', {
      header: t('entry-table.header.date'),
      cell: (props) => (
        <div className="whitespace-nowrap text-dark-shades">
          {formatDate(props.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('debit', {
      header: t('entry-table.header.debit'),
    }),
    columnHelper.accessor('credit', {
      header: t('entry-table.header.credit'),
    }),
    columnHelper.accessor('account.name', {
      header: t('entry-table.header.account'),
    }),
    columnHelper.accessor('memo', {
      header: t('entry-table.header.memo'),
    }),
    columnHelper.accessor('status', {
      header: t('entry-table.header.status'),
      cell: (props) => <StatusChip status={props.getValue()} />,
    }),
    columnHelper.accessor('id', {
      header: t('entry-table.header.id'),
    }),
    ...(omitTransactionId
      ? []
      : [
          columnHelper.accessor('transactionId', {
            header: t('entry-table.header.transaction'),
          }),
        ]),
  ];

  return <Table data={data} colDefs={columns} />;
};


const data: EntryTableData[] = [
  {  
    __typename: "Entry",
    id: '0',
    vaultId: '0',
    transactionDate: new Date(Date.now()),
    debit: 100.4,
    credit: 200.32,
    memo: 'hello mom',
    transactionId: '0',
    status: 'COMPLETED',
    account: {
      id: '0',
      name: 'Bank account',
      category: {
        id: '100',
        name: '12',
        type: 'ASSET',
      }
    }
  }
]