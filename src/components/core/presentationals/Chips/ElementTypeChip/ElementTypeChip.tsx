import { useTranslation } from 'next-i18next'

import { ElementType } from '@/api/graphql'

import { Icon } from '../..'

export interface ElementTypeChipProps {
  /**
   * Element type
   */
  type: ElementType
}

export const ElementTypeChip: React.FC<ElementTypeChipProps> = ({ type }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center">
      <span className="mr-2">
        <Icon.Outline name={iconName[type]} className="size-5" />
      </span>
      {t(`elementTypeChip.${type}`)}
    </div>
  )
}

const iconName = {
  [ElementType.ACCOUNT]: 'Wallet',
  [ElementType.ACCOUNT_GROUP]: 'Folder',
  [ElementType.ACCOUNTING_TYPE]: 'ViewColumns',
} as const
