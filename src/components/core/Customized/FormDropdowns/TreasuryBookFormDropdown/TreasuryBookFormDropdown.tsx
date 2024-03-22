import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Dropdown, TreasuryBookChip } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'
import { useTreasuryBooksQuery } from '@/api/graphql'

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

  const { data: { treasuryBooks } = {} } = useTreasuryBooksQuery({
    variables: {
      input: {
        ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

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
