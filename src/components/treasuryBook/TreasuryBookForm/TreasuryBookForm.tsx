import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import { Currency } from '@/api/graphql'
import {
  Form,
  InputText,
  SubmitButton,
  CurrencyFormDropdown,
  Card,
} from '@/components/core'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/core'

export const treasuryBookFormSchema = z.object({
  /**
   * TreasuryBook name
   */
  name: z.string().min(1).max(50),
  /**
   * TreasuryBook currency
   */
  currency: z.nativeEnum(Currency),
})

export type TreasuryBookFormFieldValues = z.infer<typeof treasuryBookFormSchema>

export interface TreasuryBookFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<TreasuryBookFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Dynamically change form values
   */
  values?: TreasuryBookFormFieldValues
}

export const TreasuryBookForm: React.FC<TreasuryBookFormProps> = ({
  onSubmit,
  onSubmitText,
  values,
}) => {
  const { t } = useTranslation('treasuryBook')

  const context = useForm<TreasuryBookFormFieldValues>({
    schema: treasuryBookFormSchema,
    values,
    defaultValues: {
      name: '',
      currency: Currency.USD,
    },
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <Card>
        <div className="flex w-60 flex-col">
          <InputText<TreasuryBookFormFieldValues>
            name="name"
            label={t`TreasuryBookForm.label.name`}
          />
          <CurrencyFormDropdown<TreasuryBookFormFieldValues> name="currency" />
        </div>
      </Card>
      <SubmitButton className="mt-8">{onSubmitText}</SubmitButton>
    </Form>
  )
}
