import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { Form } from '@/components/core/containers'
import {
  useAccountDropdown,
  useEntryStatusDropdown,
} from '@/components/journal/hooks'

import type { EditJournalFormValues } from '../EditJournalForm'
import type { EntryStatus } from '@prisma/client'

export interface EditJournalFormEntryProps {
  /**
   * Entry index
   */
  index: number
}

export const EditJournalFormEntry: React.FC<EditJournalFormEntryProps> = ({
  index,
}) => {
  const { watch } = useFormContext<EditJournalFormValues>()
  const { t } = useTranslation('journal')
  const accountDropdown = useAccountDropdown(watch('branchId'))
  const entryStatusDropdown = useEntryStatusDropdown()

  return (
    <div className="flex w-full flex-col gap-y-2">
      <Form.Static<EditJournalFormValues>
        label={t`editJournal.label.entries.id`}
        name={`entries.${index}.id` as const}
      />
      <Form.Date<EditJournalFormValues>
        label={t`editJournal.label.entries.transactionDate`}
        name={`entries.${index}.transactionDate` as const}
        placeholder={t`editJournal.placeholder.entries.transactionDate`}
      />
      <div className="flex w-full gap-x-2">
        <Form.Money<EditJournalFormValues>
          label={t`editJournal.label.entries.debit`}
          name={`entries.${index}.debit` as const}
          placeholder={t`editJournal.placeholder.entries.debit`}
        />
        <Form.Money<EditJournalFormValues>
          label={t`editJournal.label.entries.credit`}
          name={`entries.${index}.credit` as const}
          placeholder={t`editJournal.placeholder.entries.credit`}
        />
      </div>
      <Form.Dropdown<EditJournalFormValues, string>
        {...accountDropdown}
        label={t`editJournal.label.entries.accountId`}
        name={`entries.${index}.accountId` as const}
        placeholder={t`editJournal.placeholder.entries.accountId`}
      />
      <Form.Input<EditJournalFormValues>
        label={t`editJournal.label.entries.memo`}
        name={`entries.${index}.memo` as const}
        placeholder={t`editJournal.placeholder.entries.memo`}
      />
      <Form.Dropdown<EditJournalFormValues, EntryStatus>
        {...entryStatusDropdown}
        label={t`editJournal.label.entries.status`}
        name={`entries.${index}.status` as const}
        placeholder={t`editJournal.placeholder.entries.status`}
      />
    </div>
  )
}
