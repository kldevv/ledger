import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Dropdown } from '@/components/common'
import { useAccountsContext } from '@/hooks'

export interface AccountFormDropdownProps<TFieldValues extends FieldValues> {
  /**
   * Form field name
   */
  name: Path<TFieldValues>
}

export const AccountFormDropdown = <TFieldValues extends FieldValues>({
  name,
}: AccountFormDropdownProps<TFieldValues>) => {
  const { t } = useTranslation('common')

  const { data: { accounts } = {}, loading } = useAccountsContext()

  const options = useMemo(
    () =>
      accounts?.map(({ id, name }) => ({
        value: id,
        label: name,
      })) ?? [],
    [accounts],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`AccountFormDropdown.label`}
      loading={loading}
    />
  )
}
