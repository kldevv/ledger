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
import { addExchangeSchema } from '@/shared'
import { addExchangeDefaultValues } from '@/shared/zod/defaultValues'

import { ExchangeRate, ExchangeTransaction } from '.'

import type { FormProps } from '@/components/common'
import type { z } from 'zod'

export type ExchangeFormFieldValues = z.infer<typeof addExchangeSchema>

export interface ExchangeFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<ExchangeFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Dynamic fill the form values
   */
  values?: ExchangeFormFieldValues
}

export const ExchangeForm: React.FC<ExchangeFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('exchange')

  const context = useForm<ExchangeFormFieldValues>({
    schema: addExchangeSchema,
    defaultValues: addExchangeDefaultValues,
    shouldUnregister: false,
    values,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <div className="my-3">
          <ExchangeRate />
        </div>
        <Card className="w-full">
          <div className="flex w-72 flex-col space-y-3">
            <InputDate<ExchangeFormFieldValues>
              name="accrualDate"
              label={t('ExchangeForm.label.accrualDate')}
            />
            <InputText<ExchangeFormFieldValues>
              name="note"
              label={t('ExchangeForm.label.note')}
            />
          </div>
          <div className="mt-6">
            <PageTab
              options={(['origin', 'destination'] as const).map((tab) => ({
                label: tab.toUpperCase(),
                content: <ExchangeTransaction name={tab} key={tab} />,
              }))}
            />
          </div>
          <SubmitButton className="mt-12">{onSubmitText}</SubmitButton>
        </Card>
      </div>
    </Form>
  )
}
