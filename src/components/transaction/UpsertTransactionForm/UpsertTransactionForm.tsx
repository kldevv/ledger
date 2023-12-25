import {
  Form,
  InputText,
  SubmitButton,
  FormProps,
  ListBox,
} from '@/components/common';
import {
  AccountsContextProvider,
  UseFormProps,
  useForm,
  useVaultContext,
} from '@/hooks';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { UpsertEntryTable } from './UpsertEntryTable';
import { InputDate } from '@/components/common/Form/InputDate';
import { EntryStatus, useGetTagsQuery } from '@/api/graphql';
import { useMemo } from 'react';
import { numberSchema } from '@/lib';

const entrySchema = z
  .object({
    /**
     * Entry transaction date
     */
    transactionDate: z.coerce.date(),
    /**
     * Entry optional memo
     */
    memo: z.string(),
    /**
     * Entry status
     */
    status: z.nativeEnum(EntryStatus),
    /**
     * Entry debit
     */
    debit: numberSchema,
    /**
     * Entry credit
     */
    credit: numberSchema,
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
    tagIds: z.string().array(),
    /**
     * Transaction entries
     */
    entries: entrySchema.array(),
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
  values?: UseFormProps<FieldValues>['values'];
}

export const UpsertTransactionForm: React.FC<UpsertTransactionFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('transaction');
  const [{ curVaultId }] = useVaultContext();

  const { data } = useGetTagsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  const tagOptions = useMemo(
    () =>
      data?.getTags.map(({ id, name }) => ({ value: id, label: name })) ?? [],
    [data]
  );

  const context = useForm<FieldValues>({
    schema,
    defaultValues: {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [],
    },
    values,
  });

  return (
    <AccountsContextProvider>
      <div className="mr-4">
        <Form onSubmit={onSubmit} context={context}>
          <InputDate<FieldValues>
            label={t('UpsertTransactionForm.label.accrualDate')}
            name="accrualDate"
          />
          <InputText<FieldValues>
            label={t('UpsertTransactionForm.label.note')}
            name="note"
          />
          <ListBox<FieldValues>
            label={t('UpsertTransactionForm.label.tags')}
            name="tagIds"
            multiple
            options={tagOptions}
          />
          <div className="mt-6">
            <UpsertEntryTable />
          </div>
          <SubmitButton>{onSubmitText}</SubmitButton>
        </Form>
      </div>
    </AccountsContextProvider>
  );
};
