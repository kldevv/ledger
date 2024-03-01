import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import {
  useFormContext,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'

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

  const { setValue } = useFormContext<TFieldValues>()

  useEffect(() => {
    const { id } = accounts?.at(0) ?? {}

    if (id != null) {
      setValue(name, id as PathValue<TFieldValues, Path<TFieldValues>>)
    }
  }, [accounts, name, options, setValue])

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`AccountFormDropdown.label`}
      loading={loading}
    />
  )
}
