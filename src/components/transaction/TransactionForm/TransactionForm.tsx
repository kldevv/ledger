import { useTranslation } from 'next-i18next'

import {
  Form,
  InputText,
  SubmitButton,
  Card,
  TagFormDropdown,
} from '@/components/common'
import { InputDate } from '@/components/common/Form/InputDate'
import { useForm } from '@/hooks'
import { addTransactionSchema } from '@/shared'

import { EntryFields } from '.'

import type { FormProps } from '@/components/common'
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
  const { t } = useTranslation('transaction')

  const context = useForm<TransactionFormFieldValues>({
    schema: addTransactionSchema,
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <Card>
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
          <EntryFields />
        </div>
      </Card>
      <div className="mt-10">
        <SubmitButton className="ml-auto w-48">{onSubmitText}</SubmitButton>
      </div>
    </Form>
  )
}
