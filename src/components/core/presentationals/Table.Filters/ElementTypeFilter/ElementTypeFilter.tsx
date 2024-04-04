import { useMemo } from 'react'

import { ElementTypeChip } from '../..'

import type { ElementType } from '@/api/graphql'

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
  return null
  // const options = useMemo(
  //   () =>
  //     [
  //       ElementType.ACCOUNT,
  //       ElementType.ACCOUNT_GROUP,
  //       ElementType.ACCOUNTING_TYPE,
  //     ].map((value) => ({
  //       value,
  //       label: <ElementTypeChip type={value} />,
  //     })),
  //   [],
  // )

  // return <DropdownFilter value={value} onChange={onChange} options={options} />
}
