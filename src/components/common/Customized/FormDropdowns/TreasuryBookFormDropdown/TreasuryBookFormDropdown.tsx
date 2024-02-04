import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Dropdown } from '@/components/common'
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

  const { data } = useTreasuryBookContext()

  const options = useMemo(
    () =>
      data?.getTreasuryBooks
        .filter(({ id }) => id !== excludeTreasuryBookId)
        .map(({ id, name }) => ({
          label: name,
          value: id,
        })) ?? [],
    [data?.getTreasuryBooks, excludeTreasuryBookId],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`TreasuryBookFormDropdown.label`}
    />
  )
}
