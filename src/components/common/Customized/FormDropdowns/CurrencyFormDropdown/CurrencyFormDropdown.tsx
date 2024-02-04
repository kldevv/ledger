import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Currency } from '@/api/graphql'
import { CurrencyChip, Dropdown } from '@/components/common'
import { getCurrencySymbol } from '@/lib'

export interface CurrencyFormDropdownProps<TFieldValues extends FieldValues> {
  /**
   * Form field name
   */
  name: Path<TFieldValues>
}

export const CurrencyFormDropdown = <TFieldValues extends FieldValues>({
  name,
}: CurrencyFormDropdownProps<TFieldValues>) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () =>
      Object.values(Currency).map((value) => ({
        value,
        label: (
          <div className="flex w-full items-center">
            <div className="w-fit">
              <CurrencyChip currency={value} />
            </div>
            <div className="ml-auto pl-3">{getCurrencySymbol(value)}</div>
          </div>
        ),
      })),
    [],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`CurrencyFormDropdown.label`}
    />
  )
}
