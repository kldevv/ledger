import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetTagsQuery } from '@/api/graphql'
import { Form, InputText, SubmitButton, Dropdown } from '@/components/common'
import { InputDate } from '@/components/common/Form/InputDate'
import {
  AccountsContextProvider,
  useForm,
  useTreasuryBookContext,
} from '@/hooks'
import { addTransactionSchema } from '@/lib'

import { UpsertTransactionEntryFieldArray } from './UpsertTransactionEntryFieldArray'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'
import type { z } from 'zod'

export type UpsertTransactionFormFieldValues = z.infer<
  typeof addTransactionSchema
>

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
   * Dynamic fill the form values
   */
  values?: UseFormProps<UpsertTransactionFormFieldValues>['values']
}

export const UpsertTransactionForm: React.FC<UpsertTransactionFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('transaction')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetTagsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const tagIdsOptions = useMemo(
    () =>
      data?.getTags.map(({ id, name }) => ({ value: id, label: name })) ?? [],
    [data],
  )

  const context = useForm<UpsertTransactionFormFieldValues>({
    schema: addTransactionSchema,
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
          <Dropdown<UpsertTransactionFormFieldValues>
            label={t('UpsertTransactionForm.label.tags')}
            name="tagIds"
            options={tagIdsOptions}
            multiple
          />
          <div className="mt-6">
            <UpsertTransactionEntryFieldArray />
          </div>
          <SubmitButton>{onSubmitText}</SubmitButton>
        </Form>
      </div>
    </AccountsContextProvider>
  )
}
