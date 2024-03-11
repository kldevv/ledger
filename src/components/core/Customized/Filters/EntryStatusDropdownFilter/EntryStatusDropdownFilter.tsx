import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { EntryStatus } from '@/api/graphql'

import { EntryStatusChip } from '../../..'
import { DropdownFilter } from '../../../Filters'

export interface EntryStatusDropdownFilterProps {
  /**
   * Value
   */
  value: EntryStatus | null
  /**
   * On change
   */
  onChange: (status: EntryStatus | null) => void
}

export const EntryStatusDropdownFilter: React.FC<
  EntryStatusDropdownFilterProps
> = ({ value, onChange }) => {
  const { t } = useTranslation('common')

  const statusFilterOptions = useMemo(() => {
    const options = Object.values(EntryStatus).map((status) => ({
      value: status,
      label: <EntryStatusChip status={status} />,
    }))

    return [
      {
        value: null,
        label: t`EntryStatusDropdownFilter.null`,
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
