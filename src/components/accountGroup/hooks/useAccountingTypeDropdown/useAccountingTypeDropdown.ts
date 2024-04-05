import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { AccountingType } from '@/api/graphql'
import { accountingTypeToOutlineIconName } from '@/shared/utils'

export const useAccountingTypeDropdown = () => {
  const { t } = useTranslation('accountGroup')

  return useMemo(
    () => ({
      items: Object.values(AccountingType).map((type) => ({
        value: type,
        title: t(`accountingType.${type}`),
        outlineIcon: accountingTypeToOutlineIconName(type),
      })),
    }),
    [t],
  )
}
