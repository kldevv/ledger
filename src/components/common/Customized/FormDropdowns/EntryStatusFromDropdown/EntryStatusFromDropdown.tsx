import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { EntryStatus } from '@/api/graphql'
import { Dropdown, StatusChip } from '@/components/common'

export interface EntryStatusFromDropdownProps<
  TFieldValues extends FieldValues,
> {
  /**
   * Form field name
   */
  name: Path<TFieldValues>
}

export const EntryStatusFromDropdown = <TFieldValues extends FieldValues>({
  name,
}: EntryStatusFromDropdownProps<TFieldValues>) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () =>
      Object.values(EntryStatus).map((value) => ({
        value,
        label: <StatusChip status={value} key={value} />,
      })),
    [],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`EntryStatusFromDropdown.label`}
    />
  )
}
