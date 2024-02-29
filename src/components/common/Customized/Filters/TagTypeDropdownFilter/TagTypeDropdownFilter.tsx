import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { TagType } from '@/api/graphql'

import { TagTypeChip } from '../../..'
import { DropdownFilter } from '../../../Filters'

export interface TagTypeDropdownFilterProps {
  /**
   * Value
   */
  value: TagType | null
  /**
   * On change
   */
  onChange: (type: TagType | null) => void
}

export const TagTypeDropdownFilter: React.FC<TagTypeDropdownFilterProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation('common')

  const statusFilterOptions = useMemo(() => {
    const options = Object.values(TagType).map((type) => ({
      value: type,
      label: <TagTypeChip type={type} />,
    }))

    return [
      {
        value: null,
        label: t`TagTypeDropdownFilter.null`,
      },
      ...options,
    ]
  }, [t])

  return (
    <DropdownFilter
      value={value}
      onChange={onChange}
      options={statusFilterOptions}
    />
  )
}
