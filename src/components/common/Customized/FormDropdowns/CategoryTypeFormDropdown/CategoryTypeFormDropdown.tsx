import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { CategoryType } from '@/api/graphql'
import { CategoryTypeChip, Dropdown } from '@/components/common'

export interface CategoryTypeFormDropdownProps<
  TFieldValues extends FieldValues,
> {
  /**
   * Form field name
   */
  name: Path<TFieldValues>
}

export const CategoryTypeFormDropdown = <TFieldValues extends FieldValues>({
  name,
}: CategoryTypeFormDropdownProps<TFieldValues>) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () =>
      Object.values(CategoryType).map((value) => ({
        value,
        label: <CategoryTypeChip type={value} />,
      })),
    [],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`CategoryTypeFormDropdown.label`}
    />
  )
}
