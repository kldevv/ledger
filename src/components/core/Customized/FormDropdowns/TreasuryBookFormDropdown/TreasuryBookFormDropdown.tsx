import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Dropdown, TreasuryBookChip } from '@/components/core'
import { useTreasuryBookContext } from '@/hooks'

export interface TreasuryBookFormDropdownProps<
  TFieldValues extends FieldValues,
> {
  /**
   * Excluding treasury book
   */
  excludeTreasuryBookId?: string
  /**
   * Form field name
   */
  name: Path<TFieldValues>
}

export const TreasuryBookFormDropdown = <TFieldValues extends FieldValues>({
  name,
  excludeTreasuryBookId,
}: TreasuryBookFormDropdownProps<TFieldValues>) => {
  const { t } = useTranslation('common')

  const { data: { treasuryBooks } = {} } = useTreasuryBookContext()

  const options = useMemo(
    () =>
      treasuryBooks
        ?.filter(({ id }) => id !== excludeTreasuryBookId)
        .map(({ id, name, currency }) => ({
          label: <TreasuryBookChip name={name} currency={currency} />,
          value: id,
        })) ?? [],
    [treasuryBooks, excludeTreasuryBookId],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`TreasuryBookFormDropdown.label`}
    />
  )
}