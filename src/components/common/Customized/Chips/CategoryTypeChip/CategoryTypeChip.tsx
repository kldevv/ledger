import { useTranslation } from 'next-i18next'

import { getCategoryTypeIcon } from '@/lib'

import type { CategoryType } from '@/api/graphql'

export interface CategoryTypeChipProps {
  /**
   * Category type
   */
  type: CategoryType
}

export const CategoryTypeChip: React.FC<CategoryTypeChipProps> = ({ type }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center text-xs font-normal leading-6">
      <div className="mr-2">{getCategoryTypeIcon(type)}</div>
      {t(`CategoryTypeChip.label.${type}`)}
    </div>
  )
}
