import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { useAccountsQuery } from '@/api/graphql'
import { useMoneyFormat } from '@/components/core/hooks'
import { ButtonCore, Icon } from '@/components/core/presentationals'

export interface JournalFormEntryProps {
  /**
   * Index
   */
  index: number
  /**
   * Is active
   */
  active: boolean
  /**
   * On select
   */
  onSelect: () => void
  /**
   * On remove
   */
  onRemove?: () => void
}

export interface JournalFormaValues {
  /**
   * Branch id
   */
  branchId: string
  /**
   * Journal entries
   */
  entries: {
    /**
     * Transaction date
     */
    transactionDate: string
    /**
     * Entry account id
     */
    accountId: string
    /**
     * Entry memo
     */
    memo: string
    /**
     * Entry debit
     */
    debit: string
    /**
     * Entry credit
     */
    credit: string
  }[]
}

export const JournalFormEntry: React.FC<JournalFormEntryProps> = ({
  index,
  onRemove,
  onSelect,
  active,
}) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<JournalFormaValues>()
  const { t } = useTranslation('journal')
  const { format } = useMoneyFormat()

  const branchId = watch('branchId')

  const { data: { accounts } = {} } = useAccountsQuery({
    variables: {
      input: {
        branchId,
      },
    },
    skip: branchId == null,
  })

  const entry = watch(`entries.${index}`)
  const error = errors.entries?.at?.(index) != null

  const account = useMemo(
    () => accounts?.find((account) => account.id === entry.accountId)?.name,
    [accounts, entry.accountId],
  )

  return (
    <div className="border-mid-gray flex w-full max-w-full border-b px-2">
      <ButtonCore
        onClick={onSelect}
        className="border-mid-gray hover:text-dark-shades/60 flex h-fit w-full max-w-full items-start py-2 pr-2 text-xs"
      >
        <span
          className={classNames(
            'min-w-5 text-left',
            error ? 'text-dark-red' : active ? 'text-dark-shades' : 'text-gray',
            {
              'font-semibold': active,
            },
          )}
        >
          {error ? t`entry.error` : index}
        </span>
        <div className="flex max-w-full flex-col items-start">
          <div className={'flex min-h-4 max-w-full items-start truncate'}>
            <span>{entry.transactionDate}</span>
          </div>
          <div className="min-h-4 max-w-36 truncate text-left">{account}</div>
          <div className="text-gray max-w-36 truncate text-left text-xs">
            {entry.memo}
          </div>
        </div>
        <div className="ml-auto flex max-w-24 flex-col items-end truncate pl-5">
          <span className="flex items-center gap-x-1">
            <span className="max-w-20 truncate">{format?.(entry.debit)}</span>
            <span>{t`entry.debit`}</span>
          </span>
          <span className="flex items-center gap-x-1">
            <span className="max-w-20 truncate">{format?.(entry.credit)}</span>
            <span>{t`entry.credit`}</span>
          </span>
        </div>
      </ButtonCore>
      {onRemove && (
        <ButtonCore
          onClick={onRemove}
          className="hover:text-light-accent size-full min-w-fit max-w-fit"
        >
          <Icon.Solid name="XMark" />
        </ButtonCore>
      )}
    </div>
  )
}
