import { useTranslation } from 'next-i18next'

import { Form } from '@/components/core/containers'
import {
  useAccountDropdown,
  useEntryStatusDropdown,
} from '@/components/journal/hooks'

import type { AddJournalFormValues } from '../AddJournalForm'
import type { EntryStatus } from '@prisma/client'

export interface AddJournalEntryProps {
  /**
   * Entry index
   */
  index: number
}

export const AddJournalEntry: React.FC<AddJournalEntryProps> = ({ index }) => {
  const { t } = useTranslation('journal')
  const accountDropdown = useAccountDropdown()
  const entryStatusDropdown = useEntryStatusDropdown()

  return (
    <div className="flex w-full flex-col gap-y-2">
      <Form.Date<AddJournalFormValues>
        label={t`addJournal.label.entries.transactionDate`}
        name={`entries.${index}.transactionDate` as const}
        placeholder={t`addJournal.placeholder.entries.transactionDate`}
      />
      <div className="flex w-full gap-x-2">
        <Form.Money<AddJournalFormValues>
          label={t`addJournal.label.entries.debit`}
          name={`entries.${index}.debit` as const}
          placeholder={t`addJournal.placeholder.entries.debit`}
        />
        <Form.Money<AddJournalFormValues>
          label={t`addJournal.label.entries.credit`}
          name={`entries.${index}.credit` as const}
          placeholder={t`addJournal.placeholder.entries.credit`}
        />
      </div>
      <Form.Dropdown<AddJournalFormValues, string>
        {...accountDropdown}
        label={t`addJournal.label.entries.accountId`}
        name={`entries.${index}.accountId` as const}
        placeholder={t`addJournal.placeholder.entries.accountId`}
      />
      <Form.Input<AddJournalFormValues>
        label={t`addJournal.label.entries.memo`}
        name={`entries.${index}.memo` as const}
        placeholder={t`addJournal.placeholder.entries.memo`}
      />
      <Form.Dropdown<AddJournalFormValues, EntryStatus>
        {...entryStatusDropdown}
        label={t`addJournal.label.entries.status`}
        name={`entries.${index}.status` as const}
        placeholder={t`addJournal.placeholder.entries.status`}
      />
    </div>
  )
}
