import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useTagsQuery } from '@/api/graphql'
import {
  Form,
  InputText,
  SubmitButton,
  Dropdown,
  Card,
} from '@/components/common'
import { InputDate } from '@/components/common/Form/InputDate'
import { useForm, useTreasuryBookContext } from '@/hooks'
import { addTransactionSchema } from '@/shared'

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

  const { data } = useTagsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const tagIdsOptions = useMemo(
    () => data?.tags.map(({ id, name }) => ({ value: id, label: name })) ?? [],
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
    <Form onSubmit={onSubmit} context={context}>
      <Card>
        <div className="space-y-3">
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
        </div>
        <div className="mt-6">
          <UpsertTransactionEntryFieldArray />
        </div>
      </Card>
      <div className="mt-10">
        <SubmitButton className="ml-auto w-48">{onSubmitText}</SubmitButton>
      </div>
    </Form>
  )
}
