import { EntryStatus } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DropdownFilter } from '..'
import { StatusChip } from '../..'

export interface EntryStatusFilterDropdownProps {
  /**
   * Value
   */
  value: EntryStatus | null
  /**
   * On change
   */
  onChange: (status: EntryStatus | null) => void
}

export const EntryStatusFilterDropdown: React.FC<
  EntryStatusFilterDropdownProps
> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const statusFilterOptions = useMemo(() => {
    const options = Object.values(EntryStatus).map((status) => ({
      value: status,
      label: <StatusChip status={status} />,
    }))

    return [
      {
        value: null,
        label: t`EntryStatusFilterDropdown.null`,
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
