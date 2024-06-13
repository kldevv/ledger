import { useTranslation } from 'next-i18next'

import { useBranchesQuery } from '@/api/graphql'
import { Table } from '@/components/core/presentationals'
import { Card, Icon } from '@/packages/core/components'

import { useInactiveBranchesTable } from '../../hooks'

export const InactiveBranchesTable: React.FC = () => {
  const colDefs = useInactiveBranchesTable()
  const { t } = useTranslation('branch')
  const { data, loading } = useBranchesQuery({
    variables: {
      input: {
        active: false,
      },
    },
  })

  return (
    <Card>
      <div className="border-mid-gray mb-4 flex w-full items-center gap-x-2 border-b px-1 py-2">
        <Icon name="Squares2x2" className="size-4" />
        <h2 className="text-sm font-medium">{t`inactiveBranchesTable.title`}</h2>
      </div>
      <Table data={data?.branches ?? []} colDefs={colDefs} loading={loading} />
    </Card>
  )
}
