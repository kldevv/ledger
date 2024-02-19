import { useTranslation } from 'next-i18next'

import {
  Card,
  Form,
  InputDate,
  InputText,
  PageTab,
  SubmitButton,
} from '@/components/common'
import { useForm } from '@/hooks'
import { addExchangeDefaultValues, addExchangeSchema } from '@/shared'

import { UpsertExchangeRateChip } from './UpsertExchangeRateChip'
import { UpsertExchangeTransaction } from './UpsertExchangeTransaction'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'
import type { UpsertExchangeFormFieldValues } from '@/shared'

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
    defaultValues: addExchangeDefaultValues,
    shouldUnregister: false,
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <div className="my-3">
          <UpsertExchangeRateChip />
        </div>
        <Card>
          <InputDate<UpsertExchangeFormFieldValues>
            name="accrualDate"
            label={t('UpsertExchangeForm.label.accrualDate')}
          />
          <InputText<UpsertExchangeFormFieldValues>
            name="note"
            label={t('UpsertExchangeForm.label.note')}
          />
          <div className="mt-6">
            <PageTab
              options={(['origin', 'destination'] as const).map((tab) => ({
                label: tab.toUpperCase(),
                content: <UpsertExchangeTransaction name={tab} key={tab} />,
              }))}
            />
          </div>
          <SubmitButton className="mt-12">{onSubmitText}</SubmitButton>
        </Card>
      </div>
    </Form>
  )
}
