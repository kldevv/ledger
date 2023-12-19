import { EntryStatus, useAddTransactionMutation } from '@/api/graphql';
import { Card, useForm, SubmitButton, Button } from '@/components/common';
import { useVaultContext } from '@/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { EntryFields } from './EntryFields';
import { useFieldArray } from 'react-hook-form';

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
    status: z.nativeEnum(EntryStatus),
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

const schema = z.object({
  /**
   * Transaction accrual date
   */
  accrualDate: z.coerce.date(),
  /**
   * Transaction note
   */
  note: z.string(),
  /**
   * Transaction tags
   */
  tagIds: z.string().array(),
  /**
   * Transaction entries
   */
  entries: entrySchema.array().nonempty(),
});

export type AddTransactionFormFieldValues = z.infer<typeof schema>;

export const AddTransactionForm = () => {
  const { t } = useTranslation('transaction');
  const [{ curVaultId }] = useVaultContext();
  const [Form, { control }] = useForm<AddTransactionFormFieldValues>({
    schema,
    useFormProps: {
      defaultValues: {
        entries: [
          {
            transactionDate: new Date(Date.now()),
            debit: 0,
            credit: 0,
            status: EntryStatus.PENDING,
            memo: '',
            accountId: '',
          },
          {
            transactionDate: new Date(Date.now()),
            debit: 0,
            credit: 0,
            status: EntryStatus.PENDING,
            memo: '',
          },
        ],
      },
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'entries',
  });

  const [addTransaction] = useAddTransactionMutation({
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleOnSubmit = useCallback(
    (value: AddTransactionFormFieldValues) => {
      addTransaction({
        variables: {
          input: {
            ...value,
            vaultId: curVaultId ?? '',
          },
        },
      });
    },
    [curVaultId]
  );

  return (
    <Card variant="2xl">
      <Form onSubmit={handleOnSubmit} className="w-fit">
        <Form.DateInput
          name={`accrualDate`}
          label={t('add-transaction-form.label.accrual-date')}
          // placeholder={t('add-transaction-form.placeholder.accrual-date')}
        />
        <Form.Input
          name={'note'}
          label={t('add-transaction-form.label.note')}
          // placeholder={t('add-transaction-form.placeholder.name')}
        />
        {fields.map((field, index) => (
          <Form.Input label="1" name={`entries.${index}.memo`} />
        ))}
        <Button
          onClick={() =>
            append({
              transactionDate: new Date(Date.now()),
              debit: 0,
              credit: 0,
              status: EntryStatus.PENDING,
              accountId: '',
              memo: '121',
            }, { focusName: 'entries.1.memo'})
          }
        >
          +++
        </Button>
        <SubmitButton>{t('add-transaction-form.submit')}</SubmitButton>
      </Form>
    </Card>
  );
};
