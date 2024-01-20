import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetUniqueYearsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { DropdownFilter } from '..'

import type { DateType } from '@/api/graphql'

export interface YearFilterDropdownProps {
  /**
   * Value
   */
  value: number | null
  /**
   * On change
   */
  onChange: (year: number | null) => void
  /**
   * Date type
   */
  type: DateType
}

export const YearFilterDropdown: React.FC<YearFilterDropdownProps> = ({
  value,
  onChange,
  type,
}) => {
  const { t } = useTranslation()
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetUniqueYearsQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
        type,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const statusFilterOptions = useMemo(() => {
    const options =
      data?.getUniqueYears.map((year) => ({
        value: year,
        label: year.toString(),
      })) ?? []

    return [
      {
        value: null,
        label: t`YearFilterDropdown.null`,
      },
      ...options,
    ]
  }, [data?.getUniqueYears, t])

  return (
    <DropdownFilter
      value={value}
      onChange={onChange}
      options={statusFilterOptions}
    />
  )
}
