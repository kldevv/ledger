import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DateType } from '@/api/graphql'

import { RadioGroupFilter } from '../../../Filters'

export interface DateTypeRadioGroupFilterProps {
  /**
   * Value
   */
  value: DateType
  /**
   * On change
   */
  onChange: (type: DateType) => void
}

export const DateTypeRadioGroupFilter: React.FC<
  DateTypeRadioGroupFilterProps
> = ({ value, onChange }) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () =>
      Object.values(DateType).map((type) => ({
        value: type,
        label: t(`DateTypeRadioGroupFilter.${type}`),
      })),
    [t],
  )

  return (
    <RadioGroupFilter value={value} onChange={onChange} options={options} />
  )
}
