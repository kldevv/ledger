import { Transaction } from "@prisma/client"
import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Button } from "@/components/common";
import { useState } from "react";

export type TransactionTableRowProps = {
} & Transaction;

export const TransactionTableRow: React.FC<TransactionTableRowProps> = ({ id, title, accruedDate }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <tr>
        <td>
          <Button onClick={() => setOpen((prevOpen) => !prevOpen)}>^</Button>
        </td>
        <td>{id}</td>
        <td>{title}</td>
        <td>{accruedDate.toString()}</td>
      </tr>
      {open && (
        <tr>
          <td colSpan={2}></td>
          <td colSpan={4}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Memo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{accruedDate.toDateString()}</td>
                  <td>{100}</td>
                  <td>{200}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};