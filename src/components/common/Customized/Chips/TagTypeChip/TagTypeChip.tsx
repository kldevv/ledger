import { useTranslation } from 'next-i18next'

import { getTagTypeIcon } from '@/shared'

import type { TagType } from '@/api/graphql'

export interface TagTypeChipProps {
  /**
   * Tag type
   */
  type: TagType
}

export const TagTypeChip: React.FC<TagTypeChipProps> = ({ type }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center text-xs font-normal leading-6">
      <div className="mr-2">{getTagTypeIcon(type)}</div>
      {t(`TagTypeChip.${type}`)}
    </div>
  )
}
