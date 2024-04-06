import { useTranslation } from 'next-i18next'

import { AccountingElement } from '@/api/graphql'

import { Icon } from '../..'

export interface AccountingElementChipProps {
  /**
   * Element type
   */
  type: AccountingElement
}

export const AccountingElementChip: React.FC<AccountingElementChipProps> = ({
  type,
}) => {
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
  [AccountingElement.ACCOUNT]: 'Wallet',
  [AccountingElement.ACCOUNT_GROUP]: 'Folder',
  [AccountingElement.ACCOUNTING_TYPE]: 'ViewColumns',
} as const
