import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { GetCategoriesQuery } from '@/api/graphql';
import { Table, ViewLink } from '@/components/common';
import Link from 'next/link';
import { useFormatter } from '@/hooks';

export type CategoryTableData = GetCategoriesQuery['getCategories'][0]

export interface CategoryTableProps {
  /**
   * Data
   */
  data: CategoryTableData[]
}

const columnHelper = createColumnHelper<CategoryTableData>();

export const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  const { t } = useTranslation('category');
  const { formatDate } = useFormatter()

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
    }),
    columnHelper.accessor('createdDate', {
      header: t('category-table.header.created-date'),
      cell: (props) => <span className="whitespace-nowrap">{formatDate(props.getValue())}</span>,
    }),
    columnHelper.display({
      id: 'detail',
      cell: (props) => (
        <ViewLink href={`/category/${props.row.getValue('id')}`} />
      ),
    }),
  ];

  return <Table data={data} colDefs={colDefs} />;
};
