import { EntryStatus, useAddTransactionMutation } from '@/api/graphql';
import { Card, SubmitButton, Form, Input, Button, DatePicker } from '@/components/common';
import { useForm, useVaultContext } from '@/hooks';
import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Temp } from './Temp';

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
  const formProps = useForm<AddTransactionFormFieldValues>({
    schema,
    props: {
      defaultValues: {
        entries: [
          {
            transactionDate: new Date(Date.now()),
            debit: 0,
            credit: 0,
            status: EntryStatus.PENDING,
            memo: '4',
            accountId: '',
          },
          {
            transactionDate: new Date(Date.now()),
            debit: 0,
            credit: 0,
            status: EntryStatus.PENDING,
            memo: '13',
          },
        ],
      },
    },
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
      <Form onSubmit={handleOnSubmit} context={formProps} className="w-fit">
        <Input
          name={'note'}
          label={t('add-transaction-form.label.note')}
          // placeholder={t('add-transaction-form.placeholder.name')}
        />
        <DatePicker
          name={'accrualDate'}
          label={t('add-transaction-form.label.accrual-date')}
          control={formProps.control}
          // placeholder={t('add-transaction-form.placeholder.name')}
        />
        <Temp control={formProps.control} name="entries"/>
        {/* <SubmitButton>{t('add-transaction-form.submit')}</SubmitButton> */}
      </Form>
    </Card>
  );
};