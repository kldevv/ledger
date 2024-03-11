import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useUniqueYearsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'

import { DropdownFilter } from '../../../Filters'

import type { DateType } from '@/api/graphql'

export interface YearDropdownFilterProps {
  /**
   * Value
   */
  value: number | null
  /**
   * On change
   */
  onChange: ((year: number | null) => void) | ((year: number) => void)
  /**
   * Date type
   */
  type: DateType
  /**
   * Disable all year option
   */
  disableAllYear?: boolean
}

export const YearDropdownFilter: React.FC<YearDropdownFilterProps> = ({
  value,
  onChange,
  type,
  disableAllYear = false,
}) => {
  const { t } = useTranslation('common')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useUniqueYearsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
        type,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const options = useMemo(() => {
    const options =
      data?.uniqueYears.map((year) => ({
        value: year,
        label: year.toString(),
      })) ?? []

    const currentYear = new Date().getFullYear()

    const convertedOptions = disableAllYear
      ? options.find(({ value }) => value === currentYear) != null
        ? options
        : [{ value: currentYear, label: currentYear }, ...options]
      : [
          {
            value: null,
            label: t`YearDropdownFilter.null`,
          },
          ...options,
        ]

    convertedOptions.sort()

    return convertedOptions
  }, [data?.uniqueYears, disableAllYear, t])

  return <DropdownFilter value={value} onChange={onChange} options={options} />
}
