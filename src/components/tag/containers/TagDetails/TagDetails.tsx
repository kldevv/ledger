import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useTagQuery } from '@/api/graphql'
import { Card, FormattedDate } from '@/components/core'
import {
  DescList,
  Icon,
  type DescListItem,
} from '@/components/core/presentationals'
import { tagTypeToSolidIconName } from '@/shared/utils'

import { TagDetailsJournals } from './TagDetails.Journals/TagDetails.Journals'

export const TagDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('tag')
  const { data: { tag } = {} } = useTagQuery({
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
        title: t`tagDetails.id`,
        desc: tag?.id,
      },
      {
        title: t`tagDetails.name`,
        desc: tag?.name,
      },
      {
        title: t`tagDetails.type`,
        desc: (
          <div className="flex items-center gap-x-1">
            <Icon.Solid name={tagTypeToSolidIconName(tag?.type)} />
            {t(`tagType.${tag?.type}`)}
          </div>
        ),
      },
      {
        title: t`tagDetails.count`,
        desc: tag?.count,
      },
      {
        title: t`tagDetails.branchId`,
        desc: tag?.branchId,
      },
      {
        title: t`tagDetails.createdAt`,
        desc: <FormattedDate dateTime={tag?.createdAt} />,
      },
      {
        title: t`tagDetails.updatedAt`,
        desc: <FormattedDate dateTime={tag?.updatedAt} />,
      },
      {
        title: t`tagDetails.deletedAt`,
        desc: <FormattedDate dateTime={tag?.deletedAt} />,
      },
    ],
    [
      t,
      tag?.id,
      tag?.name,
      tag?.type,
      tag?.count,
      tag?.branchId,
      tag?.createdAt,
      tag?.updatedAt,
      tag?.deletedAt,
    ],
  )

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <DescList items={descItems} />
      </Card>
      {typeof id === 'string' && <TagDetailsJournals tagId={id} />}
    </div>
  )
}
