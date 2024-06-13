import { Trans, useTranslation } from 'next-i18next'

import { Link } from '@/packages/core/components'
import { PageHeader } from '@/packages/layout'
import { route } from '@/shared/route'

import { ActiveBranchesTable } from '../ActiveBranchesTable/ActiveBranchesTable'
import { InactiveBranchesTable } from '../InactiveBranchesTable/InactiveBranchesTable'

export const BranchTables: React.FC = () => {
  const { t } = useTranslation('branch')

  return (
    <div>
      <PageHeader
        header={t`branchTables.header`}
        desc={
          <Trans
            i18nKey={'branch:branchTables.desc'}
            components={{
              accountGroup: (
                <Link.Text href={route.accountGroup.home} variant="primary" />
              ),
              account: (
                <Link.Text href={route.account.home} variant="primary" />
              ),
            }}
          />
        }
      >
        <div className="flex w-40 items-center gap-x-1 text-sm font-medium">
          <Link href={route.branch.add} variant="primary">
            {t`branchTables.link`}
          </Link>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-y-8">
        <ActiveBranchesTable />
        <InactiveBranchesTable />
      </div>
    </div>
  )
}
