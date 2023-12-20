import { Button, Input } from '@/components/common';
import { EntryStatus } from '@prisma/client';
import {
  Control,
  FieldArrayPath,
  FieldValues,
  Path,
  useFieldArray,
} from 'react-hook-form';

export const Temp = <TFieldValues extends FieldValues>({
  control,
  name,
}: {
  control: Control<TFieldValues>;
  name: FieldArrayPath<TFieldValues>;
}) => {
  const { fields, append } = useFieldArray<TFieldValues>({
    control,
    name,
  });

  return (
    <>
      {fields.map((field, index) => (
        <Input key={field.id} label="123" name={`entries.${index}.memo`} />
      ))}
      <Button
        onClick={() =>
          append({
            transactionDate: new Date(Date.now()),
            debit: 0,
            credit: 0,
            status: EntryStatus.PENDING,
            accountId: '12',
            memo: '121',
          })
        }
      >
        +++
      </Button>
    </>
  );
};
