import { AccountingType } from '@/api/graphql'

import type { OutlineIconProps } from '@/components/core/presentationals'

export const accountingTypeToOutlineIconName = (
  type?: AccountingType,
): OutlineIconProps['name'] => {
  switch (type) {
    case AccountingType.ASSETS:
      return 'BuildingOffice2'
    case AccountingType.LIABILITIES:
      return 'CreditCard'
    default:
      return 'CircleStack'
  }
}
