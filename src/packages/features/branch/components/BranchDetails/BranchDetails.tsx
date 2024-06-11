import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'

import { useBranchQuery } from '@/api/graphql'
import { Link } from '@/packages/core/components'
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
      ></PageHeader>
      <BranchDescList branch={data?.branch} loading={loading} />
    </div>
  )
}
