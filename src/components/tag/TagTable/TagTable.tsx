import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';
import { GetTagsQuery } from '@/api/graphql';
import { FormattedDate, Table, ViewLink } from '@/components/common';
import { useMemo } from 'react';

export type TagTableData = GetTagsQuery['getTags'][number];

export interface TagTableProps {
  /**
   * Data
   */
  data: TagTableData[];
}

const columnHelper = createColumnHelper<TagTableData>();

export const TagTable: React.FC<TagTableProps> = ({ data }) => {
  const { t } = useTranslation('tag');

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t`TagTable.header.id`,
      }),
      columnHelper.accessor('name', {
        header: t`TagTable.header.name`,
        cell: (props) => (
          <span className="text-dark-shades">{props.getValue()}</span>
        ),
      }),
      columnHelper.accessor('createdDate', {
        header: t`TagTable.header.createdDate`,
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.display({
        id: 'view',
        cell: (props) => <ViewLink href={`/tag/${props.row.getValue('id')}`} />,
      }),
    ],
    [columnHelper, t]
  );

  return <Table data={data} colDefs={colDefs} />;
};
