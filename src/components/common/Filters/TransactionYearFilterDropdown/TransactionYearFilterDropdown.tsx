import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DateType, useGetUniqueYearsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { DropdownFilter } from '..'

export interface TransactionYearFilterDropdownProps {
  /**
   * Value
   */
  value: number | null
  /**
   * On change
   */
  onChange: (year: number | null) => void
}

export const TransactionYearFilterDropdown: React.FC<
  TransactionYearFilterDropdownProps
> = ({ value, onChange }) => {
  const { t } = useTranslation()
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetUniqueYearsQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
        type: DateType.Transaction,
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
        label: t`TransactionYearFilterDropdown.null`,
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
