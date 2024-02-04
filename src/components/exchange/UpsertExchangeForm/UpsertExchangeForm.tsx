import { useTranslation } from 'next-i18next'
import { Form, InputDate, InputText, SubmitButton } from '@/components/common'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'
import {
  UpsertExchangeFormDefaultValues,
  UpsertExchangeFormFieldValues,
  addExchangeSchema,
} from '@/lib'
import { UpsertExchangeTransaction } from './UpsertExchangeTransaction'

export interface UpsertExchangeFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<UpsertExchangeFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Dynamic fill the form values
   */
  values?: UseFormProps<UpsertExchangeFormFieldValues>['values']
}

export const UpsertExchangeForm: React.FC<UpsertExchangeFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('exchange')

  const context = useForm<UpsertExchangeFormFieldValues>({
    schema: addExchangeSchema,
    defaultValues: UpsertExchangeFormDefaultValues,
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputDate<UpsertExchangeFormFieldValues>
          name="accrualDate"
          label={t('UpsertExchangeForm.label.accrualDate')}
        />
        <InputText<UpsertExchangeFormFieldValues>
          name="note"
          label={t('UpsertExchangeForm.label.note')}
        />
        <UpsertExchangeTransaction name="origin" />
        <UpsertExchangeTransaction name="destination" />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}
