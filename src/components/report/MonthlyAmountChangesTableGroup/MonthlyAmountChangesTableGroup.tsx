import { useTranslation } from 'next-i18next'

import { TableTitle } from '@/components/common'

import {
  AccountMonthlyAmountChangesDataControllerTable,
  CategoryMonthlyAmountChangesDataControllerTable,
  CategoryTypeMonthlyAmountChangesDataControllerTable,
} from '..'

export const MonthlyAmountChangesTableGroup: React.FC = () => {
  const { t } = useTranslation('report')

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col space-y-2 pb-12 border-b border-mid-gray">
        <TableTitle className="text-center">{t`MonthlyAmountChangesTableGroup.title.categoryType`}</TableTitle>
        <CategoryTypeMonthlyAmountChangesDataControllerTable />
      </div>
      <div className="flex flex-col space-y-2 py-12 border-b border-mid-gray">
        <TableTitle className="text-center">{t`MonthlyAmountChangesTableGroup.title.category`}</TableTitle>
        <CategoryMonthlyAmountChangesDataControllerTable />
      </div>
      <div className="flex flex-col space-y-2 pt-12">
        <TableTitle className="text-center">{t`MonthlyAmountChangesTableGroup.title.account`}</TableTitle>
        <AccountMonthlyAmountChangesDataControllerTable />
      </div>
    </div>
  )
}
