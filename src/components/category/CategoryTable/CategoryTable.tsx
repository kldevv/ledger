import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { GetCategoriesQuery } from '@/api/graphql';
import { Table } from '@/components/common';
import Link from 'next/link';

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

  return <Table data={data} colDefs={colDefs} />;
};
