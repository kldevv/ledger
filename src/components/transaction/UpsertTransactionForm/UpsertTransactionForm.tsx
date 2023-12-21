import { EntryStatus } from '@/api/graphql';
import { Card, Form, Input, DatePicker, SubmitButton, FormProps } from '@/components/common';
import { UseFormProps, useForm } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { EntryField } from './EntryField';

const entrySchema = z
  .object({
    /**
     * Entry transaction date
     */
    transactionDate: z.coerce.date(),
    /**
     * Entry optional memo
     */
    memo: z.string().optional(),
    /**
     * Entry status
     */
    status: z.string(),
    /**
     * Entry debit
     */
    debit: z.coerce.number().nonnegative(),
    /**
     * Entry credit
     */
    credit: z.coerce.number().nonnegative(),
    /**
     * Account id
     */
    accountId: z.string(),
  })
  .refine(
    (data) =>
      (data.debit === 0 || data.credit === 0) &&
      (data.debit >= 0 || data.credit >= 0),
    {
      message:
        'Either debit or credit must be positive, and the other must be zero',
    }
  );

const schema = z
  .object({
    /**
     * Transaction accrual date
     */
    accrualDate: z.coerce.date(),
    /**
     * Transaction note
     */
    note: z.string().min(1),
    /**
     * Transaction tags
     */
    tagIds: z.string().array().optional(),
    /**
     * Transaction entries
     */
    entries: entrySchema.array().nonempty(),
  })
  .refine(
    (data) => {
      const sumDebits = data.entries.reduce(
        (sum, entry) => sum + entry.debit,
        0
      );
      const sumCredits = data.entries.reduce(
        (sum, entry) => sum + entry.credit,
        0
      );

      return sumDebits === sumCredits;
    },
    {
      message: 'The sum of debits must equal the sum of credits',
    }
  );

export type FieldValues = z.infer<typeof schema>;

export interface UpsertTransactionFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<FieldValues>['onSubmit'];
  /**
   * On submit text
   */
  onSubmitText: string;
  /**
   * Default form values
   */
  defaultValues: UseFormProps<FieldValues>['defaultValues'];
}

export const UpsertTransactionForm: React.FC<UpsertTransactionFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('transaction');

  const context = useForm<FieldValues>({
    schema,
    defaultValues,
  });

  return (
    <Card variant="2xl">
      <Form onSubmit={onSubmit} context={context}>
        <Input<FieldValues>
          label={t('UpsertTransactionForm.label.note')}
          name="note"
        />
        <DatePicker<FieldValues>
          label={t('UpsertTransactionForm.label.accrualDate')}
          name="accrualDate"
        />
        <EntryField />
        <SubmitButton>{onSubmitText}</SubmitButton>
      </Form>
    </Card>
  );
};
