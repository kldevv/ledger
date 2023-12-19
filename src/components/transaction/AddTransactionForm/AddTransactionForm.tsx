import {
  EntryStatus,
  useAddTransactionMutation,
} from '@/api/graphql';
import { Card, useForm, SubmitButton } from '@/components/common';
import { useVaultContext } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { EntryFields } from './EntriesField/EntryFields';

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
  entries: entrySchema.array().nonempty()
});

export type AddTransactionFormFieldValues = z.infer<typeof schema>;

export const AddTransactionForm = () => {
  const { t } = useTranslation('transaction');
  const [{ curVaultId }] = useVaultContext();

  const [Form] = useForm<AddTransactionFormFieldValues>({
    schema,
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
      <Form onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <Form.Input
            name={`accrualDate`}
            type="date"
            label={t('add-transaction-form.label.accrual-date')}
            // placeholder={t('add-transaction-form.placeholder.accrual-date')}
          />
          <Form.Input
            name={'note'}
            label={t('add-transaction-form.label.note')}
            // placeholder={t('add-transaction-form.placeholder.name')}
          />
          <EntryFields index={0} />
          <SubmitButton>{t('add-transaction-form.submit')}</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
