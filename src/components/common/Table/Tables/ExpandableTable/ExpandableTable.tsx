import {
  ColumnDef,
  ExpandedState,
  RowData,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Card } from '../../..';
import { Cell, Header, Row } from '../../Sub';
import { useState } from 'react';

export type ExpandableTableProps<TData extends RowData> = {
  /**
   * ExpandableTable data
   */
  data: TData[];
  /**
   * ExpandableTable column definitions
   */
  colDefs: ColumnDef<TData, any>[];
  /**
   * Get expanded data from the field of data
   */
  getExpandedData: (row: TData) => TData[]
};

export const ExpandableTable = <TData extends RowData>({
  data,
  colDefs,
  getExpandedData,
}: ExpandableTableProps<TData>): React.ReactElement => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable<TData>({
    data,
    columns: colDefs,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: getExpandedData,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Card variant="2xl">
      <div className="w-full h-full overflow-auto">
        <table className="w-full h-full table-auto">
          <thead>
            {table.getHeaderGroups().map(({ id, headers }) => (
              <Row key={id} index={1}>
                {headers.map((header) => (
                  <Header key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Header>
                ))}
              </Row>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <Row key={row.id} index={index}>
                {row.getVisibleCells().map((cell) => (
                  <Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ))}
              </Row>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
