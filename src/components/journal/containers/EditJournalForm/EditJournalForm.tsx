import { EntryStatus } from '@prisma/client'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { useState } from 'react'
import { z } from 'zod'

import {
  JournalDocument,
  useEntriesQuery,
  useJournalQuery,
  useUpdateJournalMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import {
  useCurrentBranch,
  useForm,
  useMoneyFormat,
} from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { formatDate } from '@/shared/utils'
import {
  dateSchema,
  memoSchema,
  moneySchema,
  noteSchema,
  uuidSchema,
} from '@/shared/zod/schemas'

import { useTagsMultiSelect, useLinksMultiSelect } from '../../hooks'
import { JournalFormEntrySelector } from '../JournalForm.EntrySelector/JournalForm.EntrySelector'
import { JournalFormEntrySummary } from '../JournalForm.EntrySummary/JournalForm.EntrySummary'

import { EditJournalFormEntry } from './EditJournalForm.Entry/EditJournalForm.Entry'

const schema = z.object({
  /**
   * Journal id
   */
  id: z.string(),
  /**
   * Accrual date
   */
  accrualDate: dateSchema,
  /**
   * Journal note
   */
  note: noteSchema,
  /**
   * Branch id
   */
  branchId: z.string(),
  /**
   * Journal tags
   */
  tags: z.string().array(),
  /**
   * Journal links
   */
  links: z.string().array(),
  /**
   * Journal updated at
   */
  updatedAt: z.string(),
  /**
   * Journal created at
   */
  createdAt: z.string(),
  /**
   * Journal entries
   */
  entries: z
    .object({
      /**
       * Entry id
       */
      id: z.string().optional(),
      /**
       * Transaction date
       */
      transactionDate: dateSchema,
      /**
       * Entry memo
       */
      memo: memoSchema,
      /**
       * Entry debit
       */
      debit: moneySchema,
      /**
       * Entry credit
       */
      credit: moneySchema,
      /**
       * Entry account
       */
      accountId: uuidSchema,
      /**
       * Entry status
       */
      status: z.nativeEnum(EntryStatus),
    })
    .array(),
})

export type EditJournalFormValues = z.infer<typeof schema>

const defaultEntryValue: EditJournalFormValues['entries'][number] = {
  transactionDate: formatDate(new Date()),
  memo: '',
  debit: '0.00',
  credit: '0.00',
  accountId: '',
  status: EntryStatus.COMPLETED,
}

export const EditJournalForm: React.FC = () => {
  const { t } = useTranslation('journal')
  const {
    query: { id: _id },
  } = useRouter()
  const id = Array.isArray(_id) ? _id.at(0) : _id
  const toast = useToaster()
  const linksMultiSelect = useLinksMultiSelect()
  const { format, removeFormatting } = useMoneyFormat()
  const [activeEntry, setActiveEntry] = useState(0)

  const { data: { journal } = {}, loading: journalQueryLoading } =
    useJournalQuery({
      variables: {
        input: {
          id: id ?? '',
        },
      },
      skip: id == null,
    })

  const { data: { entries } = {}, loading: entriesQueryLoading } =
    useEntriesQuery({
      variables: {
        input: {
          journalId: id ?? '',
        },
      },
      skip: id == null,
    })

  const tagsMultiSelect = useTagsMultiSelect(journal?.branchId ?? null)

  const context = useForm<EditJournalFormValues>({
    schema: schema.superRefine(({ entries }, ctx) => {
      const addIssues = (message: string, index: number) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
          path: [`entries.${index}.debit`],
        })
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
          path: [`entries.${index}.credit`],
        })
      }

      let totalDebit = 0
      let totalCredit = 0

      entries.forEach(({ debit: _debit, credit: _credit }, index) => {
        const debit = Number(removeFormatting(_debit))
        const credit = Number(removeFormatting(_credit))

        // Either debit or credit must be larger than 0
        if (debit === 0 && credit === 0) {
          addIssues('entry.bothZero', index)
        }

        // Either debit or credit must be 0
        if (debit > 0 && credit > 0) {
          addIssues('entry.noneZero', index)
        }

        totalDebit += debit
        totalCredit += credit
      })

      if (totalCredit !== totalDebit) {
        addIssues('entry.imbalance', entries.length - 1)
      }
    }),
    shouldUnregister: false,
    values:
      journal != null && entries != null
        ? {
            ...journal,
            tags: journal.tags?.map(({ id }) => id) ?? [],
            links: journal.links?.map(({ id }) => id) ?? [],
            accrualDate: formatDate(journal.accrualDate),
            updatedAt: formatDate(journal.updatedAt),
            createdAt: formatDate(journal.createdAt),
            entries:
              entries.map((entry) => ({
                ...entry,
                accountId: entry.account.id,
                transactionDate: formatDate(entry.transactionDate),
                debit: format(entry.debit.toString()) ?? '',
                credit: format(entry.credit.toString()) ?? '',
              })) ?? [],
          }
        : undefined,
  })

  const [editJournal, { loading }] = useUpdateJournalMutation({
    onCompleted: ({ updateJournal }) =>
      toast(() => (
        <Trans
          i18nKey={'journal:editJournal.toast'}
          components={{
            b: <b />,
          }}
          values={updateJournal}
        />
      )),
    refetchQueries: [
      {
        query: JournalDocument,
        variables: {
          input: { id },
        },
      },
    ],
  })

  const handleSubmit = ({
    accrualDate,
    entries,
    ...rest
  }: EditJournalFormValues) => {
    void editJournal({
      variables: {
        input: {
          accrualDate: new Date(accrualDate),
          entries: entries.map(
            ({ transactionDate, debit, credit, ...rest }) => ({
              ...rest,
              transactionDate: new Date(transactionDate),
              credit: Number(removeFormatting(credit)),
              debit: Number(removeFormatting(debit)),
            }),
          ),
          ...rest,
        },
      },
    })
  }

  return (
    <Form context={context} onSubmit={handleSubmit} className="w-[45rem]">
      <Card
        className="w-full"
        loading={journalQueryLoading || entriesQueryLoading}
      >
        <div className="flex flex-col gap-y-2">
          <Form.Static<EditJournalFormValues>
            label={t`editJournal.label.id`}
            name="id"
          />
          <Form.Date<EditJournalFormValues>
            label={t`editJournal.label.accrualDate`}
            name="accrualDate"
            placeholder={t`editJournal.placeholder.accrualDate`}
          />
          <Form.Input<EditJournalFormValues>
            label={t`editJournal.label.note`}
            name="note"
            placeholder={t`editJournal.placeholder.note`}
          />
          <Form.MultiSelect<EditJournalFormValues, string>
            label={t`editJournal.label.tags`}
            name="tags"
            placeholder={t`editJournal.placeholder.tags`}
            {...tagsMultiSelect}
          />
          <Form.MultiSelect<EditJournalFormValues, string>
            label={t`editJournal.label.links`}
            name="links"
            placeholder={t`editJournal.placeholder.links`}
            {...linksMultiSelect}
          />
          <Form.Static<EditJournalFormValues>
            label={t`editJournal.label.branchId`}
            name="branchId"
          />
        </div>
        <div className="border-b-mid-gray mt-14 border-b">
          <h4 className="text-gray mt-6 text-[0.625rem] font-medium">{t`editJournal.label.entries.title`}</h4>
        </div>
        <div className="border-mid-gray flex h-[28rem] gap-x-2 border-b">
          <JournalFormEntrySelector
            defaultValue={defaultEntryValue}
            activeEntry={activeEntry}
            setActiveEntry={setActiveEntry}
          />
          <EditJournalFormEntry index={activeEntry} key={activeEntry} />
        </div>
        <JournalFormEntrySummary />
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`editJournal.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
