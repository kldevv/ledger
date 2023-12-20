import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';
import {
  GetTagsQuery,
} from '@/api/graphql';
import { FormattedDate, Table, ViewLink } from '@/components/common';

export type TagTableData = GetTagsQuery['getTags'][number]

export interface TagTableProps {
  /**
   * Data
   */
  data: TagTableData[];
}

const columnHelper = createColumnHelper<TagTableData>();

export const TagTable: React.FC<TagTableProps> = ({ data }) => {
  const { t } = useTranslation('tag');

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
    columnHelper.accessor('createdDate', {
      header: t('tag-table.header.created-date'),
      cell: (props) => <FormattedDate dateTime={props.getValue()}/>
    }),
    columnHelper.display({
      id: 'view',
      cell: (props) => <ViewLink href={`/tag/${props.row.getValue('id')}`} />,
    }),
  ];

  return <Table data={data} colDefs={colDefs} />;
};
