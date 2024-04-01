import type { FieldError } from 'react-hook-form'

import { useTranslation } from 'next-i18next'

export const useFormError = (error: FieldError | undefined) => {
  const { t } = useTranslation('common')

  if (error == null) return undefined

  return t(`form.error.${error.message}`, { defaultValue: error.message })
}
