import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useBranchesQuery } from '@/api/graphql'
import { Dropdown, TreasuryBookChip } from '@/components/core'

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

  const { data: { branches } = {} } = useBranchesQuery({
    variables: {
      input: {
        userId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  const options = useMemo(
    () =>
      branches
        ?.filter(({ id }) => id !== excludeTreasuryBookId)
        .map(({ id, name, currency }) => ({
          label: <TreasuryBookChip name={name} currency={currency} />,
          value: id,
        })) ?? [],
    [branches, excludeTreasuryBookId],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`TreasuryBookFormDropdown.label`}
    />
  )
}
