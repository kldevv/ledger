import { useFieldArray } from "react-hook-form"
import { AddTransactionFormFieldValues } from "..";
import { EntryFields } from "../EntryFields";
import { memo } from "react";
import { Button } from "@/components/common";
import { EntryStatus } from "@prisma/client";

export const EntryRowManager = memo(() => {
  const { fields, append, prepend }= useFieldArray<AddTransactionFormFieldValues>({
    name: 'entries'
  });

  return (
    <div>
      {fields.map((field, index) => (
        <EntryFields key={field.id} index={index} />
      ))}
      <Button
        onClick={() =>
          prepend({
            transactionDate: new Date(Date.now()),
            debit: 3,
            credit: 2,
            status: EntryStatus.PENDING,
            memo: '123',
            accountId: '',
          })
        }
      >
        Add
      </Button>
    </div>
  );
})