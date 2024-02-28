import type { FieldValues, Path } from 'react-hook-form'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { TagType } from '@/api/graphql'
import { Dropdown } from '@/components/common'

import { TagTypeChip } from '../../Chips/TagTypeChip'

export interface TagTypeFormDropdownProps<TFieldValues extends FieldValues> {
  /**
   * Form field name
   */
  name: Path<TFieldValues>
}

export const TagTypeFormDropdown = <TFieldValues extends FieldValues>({
  name,
}: TagTypeFormDropdownProps<TFieldValues>) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () =>
      Object.values(TagType).map((value) => ({
        value,
        label: <TagTypeChip type={value} />,
      })),
    [],
  )

  return (
    <Dropdown<TFieldValues>
      name={name}
      options={options}
      label={t`TagTypeFormDropdown.label`}
    />
  )
}
