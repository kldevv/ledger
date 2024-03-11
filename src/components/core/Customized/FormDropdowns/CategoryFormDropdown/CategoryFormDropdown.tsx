import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useCategoriesQuery } from '@/api/graphql'
import { Dropdown } from '@/components/core'
import { useTreasuryBookContext } from '@/hooks'

export interface CategoryFormDropdownProps<TFieldValues extends FieldValues> {
  /**
   * Form field name
   */
  name: Path<TFieldValues>
}

export const CategoryFormDropdown = <TFieldValues extends FieldValues>({
  name,
}: CategoryFormDropdownProps<TFieldValues>) => {
  const { t } = useTranslation('common')

  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data: { categories } = {} } = useCategoriesQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const options = useMemo(
    () => categories?.map(({ id, name }) => ({ value: id, label: name })) ?? [],
    [categories],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`CategoryFormDropdown.label`}
    />
  )
}
