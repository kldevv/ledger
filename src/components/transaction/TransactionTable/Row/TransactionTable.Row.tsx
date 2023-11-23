import { Transaction } from "@prisma/client"
import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

export type TransactionTableRowProps = {
  /**
   * table row
   */
  row: Row<Transaction>
}

export const TransactionTableRow: React.FC<TransactionTableRowProps> = ({ row }) => {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};