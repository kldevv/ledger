import type { FieldValues, Path } from 'react-hook-form'

import { useMemo } from 'react'

import { useTagsQuery } from '@/api/graphql'
import { Dropdown } from '@/components/core'
import { useTreasuryBookContext } from '@/hooks'

export interface TagFormDropdownProps<TFieldValues extends FieldValues> {
  /**
   * Field label
   */
  label: string
  /**
   * Field name
   */
  name: Path<TFieldValues>
}

export const TagFormDropdown = <TFieldValues extends FieldValues>({
  label,
  name,
}: TagFormDropdownProps<TFieldValues>) => {
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const { data: { tags } = {}, loading } = useTagsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const options = useMemo(
    () => tags?.map(({ id, name }) => ({ value: id, label: name })) ?? [],
    [tags],
  )

  return (
    <Dropdown<TFieldValues>
      label={label}
      name={name}
      options={options}
      multiple
      loading={loading}
    />
  )
}
