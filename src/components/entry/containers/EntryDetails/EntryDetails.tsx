import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useEntryQuery } from '@/api/graphql'
import {
  DescList,
  FormattedDate,
  type DescListItem,
  Card,
  TextLink,
  FormattedCurrencyNumber,
  Icon,
} from '@/components/core/presentationals'
import { route } from '@/shared/route'
import { currencyToFlagIconName } from '@/shared/utils'

export const EntryDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('entry')
  const { data: { entry } = {}, loading } = useEntryQuery({
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
        title: t`entryDetails.id`,
        desc: entry?.id,
      },
      {
        title: t`entryDetails.memo`,
        desc: entry?.memo,
      },
      {
        title: t`entryDetails.debit`,
        desc: (
          <FormattedCurrencyNumber
            value={entry?.debit}
            currency={entry?.currency}
          />
        ),
      },
      {
        title: t`entryDetails.credit`,
        desc: (
          <FormattedCurrencyNumber
            value={entry?.credit}
            currency={entry?.currency}
          />
        ),
      },
      {
        title: t`entryDetails.currency`,
        desc: entry ? (
          <div className="flex items-center gap-x-1">
            <Icon.Flag name={currencyToFlagIconName(entry.currency)} />
            {t(`branch:currency.${entry.currency}`)}
          </div>
        ) : null,
      },
      {
        title: t`entryDetails.transactionDate`,
        desc: <FormattedDate dateTime={entry?.transactionDate} />,
      },
      {
        title: t`entryDetails.accrualDate`,
        desc: <FormattedDate dateTime={entry?.journal.accrualDate} />,
      },
      {
        title: t`entryDetails.branchId`,
        desc: (
          <TextLink
            intent="table"
            href={{
              pathname: route.branch.details.pathname,
              query: { id: entry?.branchId },
            }}
          >
            {entry?.branchId}
          </TextLink>
        ),
      },
      {
        title: t`entryDetails.account`,
        desc: (
          <div className="flex flex-col">
            <TextLink
              intent="table"
              href={{
                pathname: route.account.details.pathname,
                query: { id: entry?.account.id },
              }}
            >
              {entry?.account.name}
              <div className="text-gray  text-xs font-normal">
                {entry?.account.id}
              </div>
            </TextLink>
          </div>
        ),
      },
      {
        title: t`entryDetails.journal`,
        desc: (
          <div className="flex flex-col">
            <TextLink
              intent="table"
              href={{
                pathname: route.account.details.pathname,
                query: { id: entry?.journal.id },
              }}
            >
              {entry?.journal.note}
              <div className="text-gray text-xs font-normal">
                {entry?.journal.id}
              </div>
            </TextLink>
          </div>
        ),
      },
      {
        title: t`entryDetails.createdAt`,
        desc: <FormattedDate dateTime={entry?.createdAt} />,
      },
      {
        title: t`entryDetails.updatedAt`,
        desc: <FormattedDate dateTime={entry?.updatedAt} />,
      },
      {
        title: t`entryDetails.deletedAt`,
        desc: <FormattedDate dateTime={entry?.deletedAt} />,
      },
    ],
    [t, entry],
  )

  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <DescList items={descItems} loading={loading} />
      </Card>
    </div>
  )
}
