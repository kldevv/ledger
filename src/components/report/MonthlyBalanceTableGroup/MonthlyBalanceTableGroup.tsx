import { useTranslation } from 'next-i18next'

import { TableTitle } from '@/components/core'

import {
  AccountMonthlyBalanceDataControllerTable,
  CategoryMonthlyBalanceDataControllerTable,
  CategoryTypeMonthlyBalanceDataControllerTable,
} from '..'

export const MonthlyBalanceTableGroup: React.FC = () => {
  const { t } = useTranslation('report')

  return (
    <div className="mt-4 flex size-full flex-col">
      <div className="border-mid-gray flex flex-col space-y-2 border-b pb-12">
        <TableTitle className="text-center">{t`MonthlyBalanceTableGroup.title.categoryType`}</TableTitle>
        <CategoryTypeMonthlyBalanceDataControllerTable />
      </div>
      <div className="border-mid-gray flex flex-col space-y-2 border-b py-12">
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
