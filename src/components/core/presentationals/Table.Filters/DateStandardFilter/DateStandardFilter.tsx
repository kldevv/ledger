import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import type { DateStandard } from '@/api/graphql'

export interface DateStandardFilterProps {
  /**
   * Value
   */
  value: DateStandard
  /**
   * On change
   */
  onChange: (value: DateStandard) => void
}

export const DateStandardFilter: React.FC<DateStandardFilterProps> = ({
  value,
  onChange,
}) => {
  return null
  // const { t } = useTranslation('common')

  // const options = useMemo(
  //   () =>
  //     [DateStandard.ACCRUAL, DateStandard.TRANSACTION].map((value) => ({
  //       value,
  //       label: t(`dateStandardFilter.${value}`),
  //     })),
  //   [t],
  // )

  // return <DropdownFilter value={value} onChange={onChange} options={options} />
}
