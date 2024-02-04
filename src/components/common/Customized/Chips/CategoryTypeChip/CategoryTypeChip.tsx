import { CategoryType } from '@/api/graphql'
import {
  BuildingOffice2Icon,
  CircleStackIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

export interface CategoryTypeChipProps {
  /**
   * Category type
   */
  type: CategoryType
}

const iconCn = 'w-4 h-4'

export const CategoryTypeChip: React.FC<CategoryTypeChipProps> = ({ type }) => {
  const { t } = useTranslation('common')

  const categoryTypeIcon = useMemo(
    () =>
      (() => {
        switch (type) {
          case CategoryType.ASSETS:
            return <BuildingOffice2Icon className={iconCn} />
          case CategoryType.LIABILITIES:
            return <CreditCardIcon className={iconCn} />
          default:
            return <CircleStackIcon className={iconCn} />
        }
      })(),
    [],
  )

  return (
    <div className="text-dark-shades font-normal leading-6 text-xs flex items-center">
      <div className="mr-2">{categoryTypeIcon}</div>
      {t(`CategoryTypeChip.label.${type}`)}
    </div>
  )
}
