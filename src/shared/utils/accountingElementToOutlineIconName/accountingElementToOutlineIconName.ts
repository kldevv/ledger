import { AccountingElement } from '@/api/graphql'

import type { OutlineIconProps } from '@/components/core/presentationals'

export const accountingElementToOutlineIconName = (
  element?: AccountingElement,
): OutlineIconProps['name'] => {
  switch (element) {
    case AccountingElement.ACCOUNT:
      return 'Wallet'
    case AccountingElement.ACCOUNT_GROUP:
      return 'Folder'
    default:
      return 'ViewColumns'
  }
}
