import { useState } from 'react'

import {
  DateStandard,
  ElementType,
  useTotalOverMonthsQuery,
} from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Card, Table } from '@/components/core/presentationals'

import { useTotalOverMonthsTableCol } from '../../hooks'

// import type { EntryStatus } from '@/api/graphql'

type StateSchema = {
  standard: DateStandard
  groupByElement: ElementType
}

// type FilterSchema = {
//   status: EntryStatus | null
//   year: number | null
// }

export const TotalOverMonthsTable: React.FC = () => {
  const [currentBranch] = useCurrentBranch()
  const colDefs = useTotalOverMonthsTableCol()
  const [state] = useState<StateSchema>({
    standard: DateStandard.ACCRUAL,
    groupByElement: ElementType.ACCOUNT,
  })

  const { data, loading } = useTotalOverMonthsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
        ...state,
      },
    },
    skip: currentBranch == null,
  })

  return (
    <Card>
      <Table
        data={data?.totalOverMonths ?? []}
        colDefs={colDefs}
        loading={loading || !data}
        enabledPagination={false}
      />
    </Card>
  )
}
