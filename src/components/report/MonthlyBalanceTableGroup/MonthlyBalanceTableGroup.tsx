import { useTranslation } from 'next-i18next'

import { TableTitle } from '@/components/common'

import { AccountMonthlyBalanceDataControllerTable } from '..'

export const MonthlyBalanceTableGroup: React.FC = () => {
  const { t } = useTranslation('report')

  return (
    <div className="w-full h-full flex flex-col mt-4">
      <div className="flex flex-col space-y-2 pb-12 border-b border-mid-gray">
        <TableTitle className="text-center">{t`MonthlyBalanceTableGroup.title.categoryType`}</TableTitle>
        <AccountMonthlyBalanceDataControllerTable />
      </div>
    </div>
  )
}
