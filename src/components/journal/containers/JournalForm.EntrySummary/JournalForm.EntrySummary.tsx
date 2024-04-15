import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { EntryStatus } from '@/api/graphql'
import { useMoneyFormat } from '@/components/core/hooks'

interface JournalFormValues {
  /**
   * Journal entries
   */
  entries: {
    /**
     * Entry debit
     */
    debit: string
    /**
     * Entry credit
     */
    credit: string
    /**
     * Entry status
     */
    status: EntryStatus
  }[]
}

export const JournalFormEntrySummary: React.FC = () => {
  const { t } = useTranslation('journal')
  const { watch } = useFormContext<JournalFormValues>()
  const { format, removeFormatting } = useMoneyFormat()

  const entries = watch('entries')

  const totalDebit = entries.reduce(
    (acc, cur) => acc + Number(removeFormatting(cur.debit ?? '0.00')),
    0,
  )
  const totalCredit = entries.reduce(
    (acc, cur) => acc + Number(removeFormatting(cur.credit ?? '0.00')),
    0,
  )

  const status = entries.some((entry) => entry.status === EntryStatus.PENDING)
    ? EntryStatus.PENDING
    : EntryStatus.COMPLETED

  return (
    <div className="text-gray flex flex-col text-[0.625rem] leading-4">
      <span>
        {t('journalForm.totalDebit', {
          debit: format(totalDebit.toString()),
        })}
      </span>
      <span>
        {t('journalForm.totalCredit', {
          credit: format(totalCredit.toString()),
        })}
      </span>
      <span>
        {t('journalForm.diff', {
          diff: format((totalDebit - totalCredit).toString()),
        })}
      </span>
      <span>
        {t('journalForm.status', {
          status: t(`entryStatus.${status}`),
        })}
      </span>
    </div>
  )
}
