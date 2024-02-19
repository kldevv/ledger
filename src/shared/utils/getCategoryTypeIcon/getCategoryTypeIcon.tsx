import {
  BuildingOffice2Icon,
  CircleStackIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'

import { CategoryType } from '@/api/graphql'

const iconCn = 'size-5'

export const categoryTypeIcon = (type: CategoryType | undefined) => {
  switch (type) {
    case CategoryType.ASSETS:
      return <BuildingOffice2Icon className={iconCn} />
    case CategoryType.LIABILITIES:
      return <CreditCardIcon className={iconCn} />
    default:
      return <CircleStackIcon className={iconCn} />
  }
}
