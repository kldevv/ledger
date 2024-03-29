import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { ElementType } from '@/api/graphql'

import { ElementTypeChip } from '../../..'
import { DropdownFilter } from '../../../Filters'

export interface ElementTypeFilterProps {
  /**
   * Value
   */
  value: ElementType
  /**
   * On change
   */
  onChange: (value: ElementType) => void
}

export const ElementTypeFilter: React.FC<ElementTypeFilterProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation('common')

  const options = useMemo(
    () =>
      [
        ElementType.ACCOUNT,
        ElementType.ACCOUNT_GROUP,
        ElementType.ACCOUNTING_TYPE,
      ].map((value) => ({
        value,
        label: <ElementTypeChip type={value} />,
      })),
    [t],
  )

  return <DropdownFilter value={value} onChange={onChange} options={options} />
}
