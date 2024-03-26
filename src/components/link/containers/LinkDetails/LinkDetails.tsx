import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useLinkQuery } from '@/api/graphql'
import { Card, FormattedDate } from '@/components/core'
import { DescList } from '@/components/core/presentationals'

import { LinkDetailsJournals } from './LinkDetails.Journals/LinkDetails.Journals'

import type { DescListItem } from '@/components/core/presentationals/DescList/DescList'

export const LinkDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('link')
  const { data: { link } = {} } = useLinkQuery({
    variables: {
      input: {
        id: (Array.isArray(id) ? id.at(0) : id) ?? '',
      },
    },
    skip: id == null,
  })

  const descItems = useMemo<DescListItem[]>(
    () => [
      {
        title: t`linkDetails.id`,
        desc: link?.id,
      },
      {
        title: t`linkDetails.name`,
        desc: link?.name,
      },
      {
        title: t`linkDetails.type`,
        desc: link?.type,
      },
      {
        title: t`linkDetails.count`,
        desc: link?.count,
      },
      {
        title: t`linkDetails.createdAt`,
        desc: <FormattedDate dateTime={link?.createdAt} />,
      },
      {
        title: t`linkDetails.updatedAt`,
        desc: <FormattedDate dateTime={link?.updatedAt} />,
      },
      {
        title: t`linkDetails.deletedAt`,
        desc: <FormattedDate dateTime={link?.deletedAt} />,
      },
    ],
    [
      link?.count,
      link?.createdAt,
      link?.deletedAt,
      link?.id,
      link?.name,
      link?.type,
      link?.updatedAt,
      t,
    ],
  )

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <DescList items={descItems} />
      </Card>
      {id != null && !Array.isArray(id) && <LinkDetailsJournals linkId={id} />}
    </div>
  )
}
