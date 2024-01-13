import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { z } from 'zod'

import { useGetTagsQuery } from '@/api/graphql'
import { Form, InputText, SubmitButton, ListBox } from '@/components/common'
import { InputDate } from '@/components/common/Form/InputDate'
import { AccountsContextProvider, useForm, useVaultContext } from '@/hooks'

import {
  UpsertEntryFieldArray,
  upsertEntryFieldArraySchema,
} from './UpsertEntryFieldArray'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'

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
    entries: upsertEntryFieldArraySchema,
  })
  .refine(
    (data) => {
      const sumDebits = data.entries.reduce(
        (sum, entry) => sum + entry.debit,
        0,
      )
      const sumCredits = data.entries.reduce(
        (sum, entry) => sum + entry.credit,
        0,
      )

      return sumDebits === sumCredits
    },
    {
      message: 'The sum of debits must equal the sum of credits',
    },
  )

export type UpsertTransactionFormFieldValues = z.infer<typeof schema>

export interface UpsertTransactionFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<UpsertTransactionFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  values?: UseFormProps<UpsertTransactionFormFieldValues>['values']
}

export const UpsertTransactionForm: React.FC<UpsertTransactionFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('transaction')
  const [{ curVaultId }] = useVaultContext()

  const { data } = useGetTagsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  })

  const tagIdsOptions = useMemo(
    () =>
      data?.getTags.map(({ id, name }) => ({ value: id, label: name })) ?? [],
    [data],
  )

  const context = useForm<UpsertTransactionFormFieldValues>({
    schema,
    defaultValues: {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [],
    },
    values,
  })

  return (
    <AccountsContextProvider>
      <div className="mr-4">
        <Form onSubmit={onSubmit} context={context}>
          <InputDate<UpsertTransactionFormFieldValues>
            label={t('UpsertTransactionForm.label.accrualDate')}
            name="accrualDate"
          />
          <InputText<UpsertTransactionFormFieldValues>
            label={t('UpsertTransactionForm.label.note')}
            name="note"
          />
          <ListBox<UpsertTransactionFormFieldValues>
            label={t('UpsertTransactionForm.label.tags')}
            name="tagIds"
            options={tagIdsOptions}
            multiple
          />
          <div className="mt-6">
            <UpsertEntryFieldArray />
          </div>
          <SubmitButton>{onSubmitText}</SubmitButton>
        </Form>
      </div>
    </AccountsContextProvider>
  )
}
