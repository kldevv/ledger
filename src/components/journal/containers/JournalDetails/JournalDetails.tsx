import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useJournalQuery } from '@/api/graphql'
import {
  DescList,
  FormattedDate,
  type DescListItem,
  Card,
  TextLink,
  EntryStatusChip,
  FormattedCurrencyNumber,
} from '@/components/core/presentationals'
import { route } from '@/shared/route'

import { JournalDetailsEntries } from './JournalDetails.Entries/JournalDetails.Entries'

export const JournalDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('journal')
  const { data: { journal } = {}, loading } = useJournalQuery({
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
        title: t`journalDetails.id`,
        desc: journal?.id,
      },
      {
        title: t`journalDetails.accrualDate`,
        desc: <FormattedDate dateTime={journal?.accrualDate} />,
      },
      {
        title: t`journalDetails.note`,
        desc: journal?.note,
      },
      {
        title: t`journalDetails.status`,
        desc: <EntryStatusChip status={journal?.status} />,
      },
      {
        title: t`journalDetails.count`,
        desc: journal?.count,
      },
      {
        title: t`journalDetails.amount`,
        desc: (
          <FormattedCurrencyNumber
            value={journal?.amount}
            currency={journal?.currency}
          />
        ),
      },
      {
        title: t`journalDetails.branchId`,
        desc: (
          <TextLink
            intent="table"
            href={{
              pathname: route.branch.details.pathname,
              query: { id: journal?.branchId },
            }}
          >
            {journal?.branchId}
          </TextLink>
        ),
      },
      {
        title: t`journalDetails.createdAt`,
        desc: <FormattedDate dateTime={journal?.createdAt} />,
      },
      {
        title: t`journalDetails.updatedAt`,
        desc: <FormattedDate dateTime={journal?.updatedAt} />,
      },
      {
        title: t`journalDetails.deletedAt`,
        desc: <FormattedDate dateTime={journal?.deletedAt} />,
      },
    ],
    [
      t,
      journal?.id,
      journal?.accrualDate,
      journal?.note,
      journal?.status,
      journal?.count,
      journal?.amount,
      journal?.currency,
      journal?.branchId,
      journal?.createdAt,
      journal?.updatedAt,
      journal?.deletedAt,
    ],
  )

  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <DescList items={descItems} loading={loading} />
      </Card>
      {typeof id === 'string' && <JournalDetailsEntries journalId={id} />}
    </div>
  )
}
