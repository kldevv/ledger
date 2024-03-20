import { Card, Table, useCurrentBranch } from '@/components/core'
import { useTotalDebitAndCreditOverTheMonthsTableColumn } from '../..'
import {
  DateStandard,
  ElementType,
  useTotalDebitAndCreditOverTheMonthsQuery,
} from '@/api/graphql'

export const TotalDebitAndCreditOverTheMonthsTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()

  const { data } = useTotalDebitAndCreditOverTheMonthsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
        standard: DateStandard.ACCRUAL,
        groupByElement: ElementType.ACCOUNT,
      },
    },
    skip: !currentBranch,
  })
  const colDefs = useTotalDebitAndCreditOverTheMonthsTableColumn()

  return (
    <Card>
      <Table
        data={data?.totalDebitAndCreditOverTheMonths ?? []}
        colDefs={colDefs}
        enabledPagination={false}
      />
    </Card>
  )
}
