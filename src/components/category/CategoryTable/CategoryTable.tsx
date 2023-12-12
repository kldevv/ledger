import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { GetCategoriesQuery, useGetCategoriesQuery, useGetEntriesQuery } from '@/api/graphql';
import { StatusChip, Table } from '@/components/common';
import { useVaultContext } from '@/hooks';
import Link from 'next/link';

type CategoryTableData = GetCategoriesQuery['getCategories'][0]

const columnHelper = createColumnHelper<CategoryTableData>();

export const CategoryTable: React.FC = () => {
  const { t } = useTranslation('category');
  const [{ curVaultId }] = useVaultContext();

  const {
    data,
    loading,
    error,
  } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  const colDefs = [
    columnHelper.accessor('id', {
      header: t('category-table.header.id'),
    }),
    columnHelper.accessor('name', {
      header: t('category-table.header.name'),
      cell: (props) => (
        <span className="text-dark-shades">{props.getValue()}</span>
      ),
    }),
    columnHelper.accessor('type', {
      header: t('category-table.header.type'),
      cell: (props) => t(`category-table.type.${props.getValue()}`),
    }),
    columnHelper.display({
      id: 'detail',
      cell: (props) => (
        <Link
          href={`/category/${props.row.getValue('id')}`}
          className="text-light-accent"
        >
          View
        </Link>
      ),
    }),
  ];

  if (data == null) {
    return null
  }

  return <Table data={data.getCategories} colDefs={colDefs} />;
};
