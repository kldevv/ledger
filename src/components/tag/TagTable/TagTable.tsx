import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import {
  GetTagsQuery,
  useGetTagsQuery,
} from '@/api/graphql';
import { Table } from '@/components/common';
import { useVaultContext } from '@/hooks';
import Link from 'next/link';

type TagTableData = GetTagsQuery['getTags'][0]

const columnHelper = createColumnHelper<TagTableData>();

export const TagTable: React.FC = () => {
  const { t } = useTranslation('tag');
  const [{ curVaultId }] = useVaultContext();

  const { data, loading, error } = useGetTagsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
    fetchPolicy: 'cache-and-network'
  });

  const colDefs = [
    columnHelper.accessor('id', {
      header: t('tag-table.header.id'),
    }),
    columnHelper.accessor('name', {
      header: t('tag-table.header.name'),
      cell: (props) => (
        <span className="text-dark-shades">{props.getValue()}</span>
      ),
    }),
    columnHelper.display({
      id: 'detail',
      cell: (props) => (
        <Link
          href={`/tag/${props.row.getValue('id')}`}
          className="text-light-accent"
        >
          View
        </Link>
      ),
    }),
  ];

  if (data == null) {
    return null;
  }

  return <Table data={data.getTags} colDefs={colDefs} />;
};
