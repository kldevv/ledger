import type { FieldValues } from 'react-hook-form'

import { useTranslation } from 'next-i18next'

import { Currency, type LinkType } from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { currencyToFlagIconName } from '@/shared/utils/currencyToFlagIconName/currencyToFlagIconName'

import type { FormDropdownProps } from '@/components/core/containers/Form/Form.Dropdown/Form.Dropdown'

export interface DropdownCurrencyProps<TFieldValues extends FieldValues>
  extends Omit<FormDropdownProps<TFieldValues, LinkType>, 'items'> {}

export const DropdownCurrency = <TFieldValues extends FieldValues>(
  props: DropdownCurrencyProps<TFieldValues>,
) => {
  const { t } = useTranslation('branch')

  return (
    <Form.Dropdown<TFieldValues, Currency>
      {...props}
      items={[Currency.USD, Currency.NTD, Currency.EUR, Currency.RMB].map(
        (currency) => ({
          id: currency,
          value: currency,
          title: t(`currency.${currency}`),
          flagIcon: currencyToFlagIconName(currency),
        }),
      )}
    />
  )
}
