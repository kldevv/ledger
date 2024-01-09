import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import { Currency } from '@/api/graphql'
import { Form, InputText, ListBox, SubmitButton } from '@/components/common'
import { useForm } from '@/hooks'

import type { FormProps } from '@/components/common'
import type { UseFormProps } from '@/hooks'

export const upsertVaultFormSchema = z.object({
  /**
   * Vault name
   */
  name: z.string().min(1).max(50),
  /**
   * Vault currency
   */
  currency: z.nativeEnum(Currency),
})

export type UpsertVaultFormFieldValues = z.infer<typeof upsertVaultFormSchema>

export interface UpsertVaultFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<UpsertVaultFormFieldValues>['onSubmit']
  /**
   * On submit text
   */
  onSubmitText: string
  /**
   * Default form values
   */
  defaultValues: UseFormProps<UpsertVaultFormFieldValues>['defaultValues']
}

export const UpsertVaultForm: React.FC<UpsertVaultFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('vault')

  const context = useForm<UpsertVaultFormFieldValues>({
    schema: upsertVaultFormSchema,
    defaultValues,
  })

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<UpsertVaultFormFieldValues>
          name="name"
          label={t('UpsertVaultForm.label.name')}
        />
        <ListBox<UpsertVaultFormFieldValues>
          name="currency"
          label={t('UpsertVaultForm.label.currency')}
          options={currencyOptions}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  )
}

const currencyOptions = Object.keys(Currency).map((value) => ({
  value,
  label: value,
}))
