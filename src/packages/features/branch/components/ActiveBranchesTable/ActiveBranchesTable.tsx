import { useTranslation } from 'next-i18next'

import { useBranchesQuery } from '@/api/graphql'
import { Table } from '@/components/core/presentationals'
import { Card, Icon } from '@/packages/core/components'

import { useActiveBranchesTable } from '../../hooks'

export const ActiveBranchesTable: React.FC = () => {
  const colDefs = useActiveBranchesTable()
  const { t } = useTranslation('branch')
  const { data, loading } = useBranchesQuery({
    variables: {
      input: {
        active: true,
      },
    },
  })

  return (
    <Card>
      <div className="border-mid-gray mb-4 flex w-full items-center gap-x-1 border-b px-4 py-2">
        <Icon name="Squares2x2" className="size-4" />
        <h2 className="text-sm font-medium">{t`activeBranchesTable.title`}</h2>
      </div>
      <Table data={data?.branches ?? []} colDefs={colDefs} loading={loading} />
    </Card>
  )
}
