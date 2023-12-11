import { ColumnDef, RowData, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card } from "..";
import { Cell, Header, Row } from './Sub';

export type TableProps<TData extends RowData> = {
  /**
   * Table data
   */
  data: TData[]
  /**
   * Table column definitions
   */
  colDefs: ColumnDef<TData, any>[]
};

export const Table = <TData extends RowData>({
  data,
  colDefs,
}: TableProps<TData>): React.ReactElement => {
  const table = useReactTable({
    data,
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card variant="2xl">
      <div className="w-full h-full overflow-auto">
        <table className="w-full h-full">
          <thead>
            {table.getHeaderGroups().map(({ id, headers }) => (
              <Row key={id}>
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
            {table.getRowModel().rows.map((row) => (
              <Row key={row.id}>
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
};;
