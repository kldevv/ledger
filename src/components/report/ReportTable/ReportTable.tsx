import { Button, ExpandableTable } from '@/components/common';
import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';

export type ReportTableData = {
  name: string;
  rows: ReportTableData[];
};

export interface ReportTableProps {
  /**
   * Data
   */
  data: ReportTableData[];
}

const columnHelper = createColumnHelper<ReportTableData>();

const getExpandedData = (row: ReportTableData) => row.rows 

export const ReportTable: React.FC<ReportTableProps> = ({ data }) => {
  const { t } = useTranslation('account');

  const colDefs = [
    columnHelper.accessor('name', {
      header: t('ReportTable.header.id'),
    }),
    columnHelper.display({
      id: 'expanded',
      header: t('ReportTable.header.id'),
      cell: ({ row }) => (
        <Button onClick={row.getToggleExpandedHandler()}>Expand</Button>
      )
    }),
  ];

  return (
    <ExpandableTable
      data={data}
      colDefs={colDefs}
      getExpandedData={getExpandedData}
    />
  );
};
