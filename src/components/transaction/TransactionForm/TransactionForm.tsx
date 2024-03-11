import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  Form,
  InputText,
  SubmitButton,
  Card,
  TagFormDropdown,
} from '@/components/core'
import { InputDate } from '@/components/core/Form/InputDate'
import { EntryFields, entryFieldDefaultValues } from '@/components/entry'
import { useAccountsContext, useForm } from '@/hooks'
import { addTransactionSchema } from '@/shared'

import type { FormProps } from '@/components/core'
import type { z } from 'zod'

export type TransactionFormFieldValues = z.infer<typeof addTransactionSchema>

export interface TransactionFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<TransactionFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Dynamic fill the form values
   */
  values?: TransactionFormFieldValues
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('journal')
  const { data: { accounts } = {} } = useAccountsContext()

  const entry = useMemo(
    () => ({
      ...entryFieldDefaultValues,
      accountId: accounts?.at(0)?.id ?? '',
    }),
    [accounts],
  )

  const context = useForm<TransactionFormFieldValues>({
    schema: addTransactionSchema,
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <Card className="w-full">
        <div className="w-64 space-y-3">
          <InputDate<TransactionFormFieldValues>
            label={t('TransactionForm.label.accrualDate')}
            name="accrualDate"
          />
          <InputText<TransactionFormFieldValues>
            label={t('TransactionForm.label.note')}
            name="note"
          />
          <TagFormDropdown<TransactionFormFieldValues>
            label={t('TransactionForm.label.tags')}
            name="tagIds"
          />
        </div>
        <div className="mt-6">
          <EntryFields<TransactionFormFieldValues>
            name={'entries'}
            appendValue={entry}
          />
        </div>
      </Card>
      <div className="mt-10">
        <SubmitButton className="ml-auto w-48">{onSubmitText}</SubmitButton>
      </div>
    </Form>
  )
}
