import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Fragment, useMemo } from 'react'

import { useExchangeDetailsQuery } from '@/api/graphql'
import { PageTab } from '@/components/common'
import { EntryFilteredTable } from '@/components/entry'

import { ExchangeDescriptionList, ExchangeTransactionDescriptionList } from '..'

export const ExchangeDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('exchange')

  const exchangeId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data: { exchange, entries } = {} } = useExchangeDetailsQuery({
    variables: {
      exchangeInput: {
        id: exchangeId ?? '',
      },
      entriesInput: {
        exchangeId: exchangeId,
      },
    },
    skip: exchangeId == null,
  })

  const { origin, destination } = exchange ?? {}

  return (
    <div>
      <ExchangeDescriptionList data={exchange} />
      <div className="mt-12">
        <PageTab
          options={[origin, destination].map((data, index) => {
            return {
              label: t(`ExchangeDetails.label.${index}`),
              content: (
                <Fragment key={data?.id}>
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-dark-shades text-base font-medium leading-6">
                      {t(`ExchangeDetails.title.${index}.details`)}
                    </h3>
                    <ExchangeTransactionDescriptionList data={data} />
                  </div>
                  <div className="mt-12 flex flex-col space-y-4">
                    <h3 className="text-dark-shades text-base font-medium leading-6">
                      {t(`ExchangeDetails.title.${index}.entries`)}
                    </h3>
                    <EntryFilteredTable
                      data={
                        entries?.filter(
                          ({ transactionId }) => transactionId === data?.id,
                        ) ?? []
                      }
                    />
                  </div>
                </Fragment>
              ),
            }
          })}
        />
      </div>
    </div>
  )
}
