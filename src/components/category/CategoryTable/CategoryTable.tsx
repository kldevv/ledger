import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';
import { GetCategoriesQuery } from '@/api/graphql';
import { FormattedDate, Table, ViewLink } from '@/components/common';

export type CategoryTableData = GetCategoriesQuery['getCategories'][number]

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
    }),
    columnHelper.accessor('createdDate', {
      header: t('category-table.header.created-date'),
      cell: (props) => <FormattedDate dateTime={props.getValue()} />,
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
