import { useTranslation } from 'next-i18next'

import { TableTitle } from '@/components/common'

import {
  AccountMonthlyBalanceDataControllerTable,
  CategoryMonthlyBalanceDataControllerTable,
  CategoryTypeMonthlyBalanceDataControllerTable,
} from '..'

export const MonthlyBalanceTableGroup: React.FC = () => {
  const { t } = useTranslation('report')

  return (
    <div className="w-full h-full flex flex-col mt-4">
      <div className="flex flex-col space-y-2 pb-12 border-b border-mid-gray">
        <TableTitle className="text-center">{t`MonthlyBalanceTableGroup.title.categoryType`}</TableTitle>
        <CategoryTypeMonthlyBalanceDataControllerTable />
      </div>
      <div className="flex flex-col space-y-2 py-12 border-b border-mid-gray">
        <TableTitle className="text-center">{t`MonthlyBalanceTableGroup.title.category`}</TableTitle>
        <CategoryMonthlyBalanceDataControllerTable />
      </div>
      <div className="flex flex-col space-y-2 pt-12">
        <TableTitle className="text-center">{t`MonthlyBalanceTableGroup.title.account`}</TableTitle>
        <AccountMonthlyBalanceDataControllerTable />
      </div>
    </div>
  )
}
