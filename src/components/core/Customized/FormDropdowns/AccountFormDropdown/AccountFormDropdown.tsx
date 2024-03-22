import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import {
  useFormContext,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'

import { useAccountsQuery } from '@/api/graphql'
import { Dropdown } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'

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
  const [currentBranch] = useCurrentBranch()
  const { data } = useAccountsQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch?.id == null,
  })

  const options = useMemo(
    () =>
      data?.accounts?.map(({ id, name }) => ({
        value: id,
        label: name,
      })) ?? [],
    [data?.accounts],
  )

  const { setValue } = useFormContext<TFieldValues>()

  useEffect(() => {
    const { id } = data?.accounts?.at(0) ?? {}

    if (id != null) {
      setValue(name, id as PathValue<TFieldValues, Path<TFieldValues>>)
    }
  }, [data?.accounts, name, options, setValue])

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`AccountFormDropdown.label`}
    />
  )
}
