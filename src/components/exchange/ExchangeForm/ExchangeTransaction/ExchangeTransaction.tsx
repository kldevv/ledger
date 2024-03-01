import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { TreasuryBookFormDropdown } from '@/components/common'
import { EntryFields, entryFieldDefaultValues } from '@/components/entry'
import {
  AccountsContextProvider,
  useAccountsContext,
  useTreasuryBookContext,
} from '@/hooks'

import type { ExchangeFormFieldValues } from '..'

export interface ExchangeTransactionProps {
  /**
   * Exchange transaction name
   */
  name: 'origin' | 'destination'
}

export const ExchangeTransaction: React.FC<ExchangeTransactionProps> = ({
  name,
}) => {
  const { t } = useTranslation('exchange')

  const { data: { treasuryBooks } = {} } = useTreasuryBookContext()

  const { watch } = useFormContext<ExchangeFormFieldValues>()

  const { origin, destination } = watch()

  const currency = useMemo(() => {
    return treasuryBooks?.find(
      (treasuryBook) =>
        treasuryBook.id ===
        (name === 'origin'
          ? origin.treasuryBookId
          : destination.treasuryBookId),
    )?.currency
  }, [destination.treasuryBookId, name, origin.treasuryBookId, treasuryBooks])

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-center">
        <h3 className="text-gray border-b-mid-gray w-fit select-none border-b px-6 pb-1 text-center text-xs font-medium leading-6">
          {t('ExchangeForm.transactionTitle', {
            type: `${
              name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
            }`,
          })}
        </h3>
      </div>
      <div>
        <div className="w-72">
          <TreasuryBookFormDropdown<ExchangeFormFieldValues>
            name={`${name}.treasuryBookId`}
            excludeTreasuryBookId={
              name === 'destination'
                ? origin?.treasuryBookId
                : destination?.treasuryBookId
            }
          />
        </div>
      </div>
      <AccountsContextProvider
        treasuryBookId={
          name === 'destination'
            ? destination?.treasuryBookId
            : origin?.treasuryBookId
        }
      >
        <EntryFields
          name={`${name}.entries`}
          appendValue={entryFieldDefaultValues}
          currency={currency}
        />
      </AccountsContextProvider>
    </div>
  )
}
