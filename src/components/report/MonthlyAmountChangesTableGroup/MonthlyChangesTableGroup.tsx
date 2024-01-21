import { useTranslation } from 'next-i18next'

import { TableTitle } from '@/components/common'

import {
  AccountMonthlyChangesDataControllerTable,
  CategoryMonthlyChangesDataControllerTable,
  CategoryTypeMonthlyChangesDataControllerTable,
} from '..'

export const MonthlyChangesTableGroup: React.FC = () => {
  const { t } = useTranslation('report')

  return (
    <div className="w-full h-full flex flex-col mt-4">
      <div className="flex flex-col space-y-2 pb-12 border-b border-mid-gray">
        <TableTitle className="text-center">{t`MonthlyChangesTableGroup.title.categoryType`}</TableTitle>
        <CategoryTypeMonthlyChangesDataControllerTable />
      </div>
      <div className="flex flex-col space-y-2 py-12 border-b border-mid-gray">
        <TableTitle className="text-center">{t`MonthlyChangesTableGroup.title.category`}</TableTitle>
        <CategoryMonthlyChangesDataControllerTable />
      </div>
      <div className="flex flex-col space-y-2 pt-12">
        <TableTitle className="text-center">{t`MonthlyChangesTableGroup.title.account`}</TableTitle>
        <AccountMonthlyChangesDataControllerTable />
      </div>
    </div>
  )
}
