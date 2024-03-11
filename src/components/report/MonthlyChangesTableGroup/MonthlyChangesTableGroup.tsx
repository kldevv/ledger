import { useTranslation } from 'next-i18next'

import { TableTitle } from '@/components/core'

import {
  AccountMonthlyChangesDataControllerTable,
  CategoryMonthlyChangesDataControllerTable,
  CategoryTypeMonthlyChangesDataControllerTable,
} from '..'

export const MonthlyChangesTableGroup: React.FC = () => {
  const { t } = useTranslation('summary')

  return (
    <div className="mt-4 flex size-full flex-col">
      <div className="border-mid-gray flex flex-col space-y-2 border-b pb-12">
        <TableTitle className="text-center">{t`MonthlyChangesTableGroup.title.categoryType`}</TableTitle>
        <CategoryTypeMonthlyChangesDataControllerTable />
      </div>
      <div className="border-mid-gray flex flex-col space-y-2 border-b py-12">
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
