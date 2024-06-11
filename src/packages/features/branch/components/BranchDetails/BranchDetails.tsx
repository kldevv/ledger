import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'

import { useBranchQuery } from '@/api/graphql'
import { Button, Link } from '@/packages/core/components'
import { PageHeader } from '@/packages/layout'
import { route } from '@/shared/route'

import { BranchDescList } from '..'

export const BranchDetails: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  const id = typeof query.id === 'string' ? query.id : null

  const { data, loading } = useBranchQuery({
    variables: {
      input: {
        id: id as string,
      },
    },
    skip: id == null,
  })

  return (
    <div>
      <PageHeader
        header={t`branch.details.header`}
        desc={
          <Trans
            i18nKey={'pages:branch.details.section'}
            components={{
              accountGroup: (
                <Link.Text variant="primary" href={route.accountGroup.home} />
              ),
              account: (
                <Link.Text variant="primary" href={route.account.home} />
              ),
            }}
          />
        }
      >
        <div className="flex w-40 items-center gap-x-1 text-sm">
          <Button variant="secondary" className="flex-1">
            {t`common:delete`}
          </Button>
          <Link
            variant="primary"
            href={{ pathname: route.branch.edit.pathname, query: { id } }}
            className="flex-1"
          >
            {t`common:edit`}
          </Link>
        </div>
      </PageHeader>
      <BranchDescList branch={data?.branch} loading={loading} />
    </div>
  )
}
