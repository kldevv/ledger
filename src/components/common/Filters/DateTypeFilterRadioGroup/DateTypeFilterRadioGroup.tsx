import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DateType } from '@/api/graphql'

import { RadioGroupFilter } from '..'

export interface DateTypeFilterRadioGroupProps {
  /**
   * Value
   */
  value: DateType
  /**
   * On change
   */
  onChange: (type: DateType) => void
}

export const DateTypeFilterRadioGroup: React.FC<
  DateTypeFilterRadioGroupProps
> = ({ value, onChange }) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () =>
      Object.values(DateType).map((type) => ({
        value: type,
        label: t(`DateTypeFilterRadioGroup.${type}`),
      })),
    [t],
  )

  return (
    <RadioGroupFilter value={value} onChange={onChange} options={options} />
  )
}
