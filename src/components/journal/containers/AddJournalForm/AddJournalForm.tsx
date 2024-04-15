import { EntryStatus } from '@prisma/client'
import { Trans, useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { z } from 'zod'

import {
  JournalsDocument,
  useAccountsQuery,
  useAddJournalMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import {
  useCurrentBranch,
  useForm,
  useMoneyFormat,
} from '@/components/core/hooks'
import { ButtonCore, Card } from '@/components/core/presentationals'
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
import { JournalFormEntry } from '../../presentationals'

import { AddJournalEntry } from './AddJournalForm.Entry/AddJournalForm.Entry'

const schema = z.object({
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
   * Journal entries
   */
  entries: z
    .object({
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

export type AddJournalFormValues = z.infer<typeof schema>

const defaultEntryValue: AddJournalFormValues['entries'][number] = {
  transactionDate: formatDate(new Date()),
  memo: '',
  debit: '0.00',
  credit: '0.00',
  accountId: '',
  status: EntryStatus.COMPLETED,
}

export const AddJournalForm: React.FC = () => {
  const { t } = useTranslation('journal')
  const toast = useToaster()
  const tagsMultiSelect = useTagsMultiSelect()
  const linksMultiSelect = useLinksMultiSelect()
  const { format, removeFormatting } = useMoneyFormat()
  const [currentBranch] = useCurrentBranch()
  const { data: { accounts } = {} } = useAccountsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch == null,
  })
  const [activeEntry, setActiveEntry] = useState(0)
  const { setValue, control, watch, ...context } =
    useForm<AddJournalFormValues>({
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
      defaultValues: {
        accrualDate: formatDate(new Date()),
        note: '',
        branchId: '',
        tags: [],
        links: [],
        entries: [defaultEntryValue, defaultEntryValue],
      },
    })
  const { fields, append, remove } = useFieldArray<AddJournalFormValues>({
    name: 'entries',
    shouldUnregister: false,
    control,
  })

  const handleOnEntrySelect = useCallback(
    (index: number) => () => setActiveEntry(index),
    [],
  )

  const handleOnEntryRemove = useCallback(
    (index: number) => () => {
      setActiveEntry((prev) => Math.min(fields.length - 2, prev))
      remove(index)
    },
    [fields.length, remove],
  )

  const handleOnEntryAppend = useCallback(
    () => append(defaultEntryValue),
    [append],
  )

  const [addJournal, { loading }] = useAddJournalMutation({
    onCompleted: ({ addJournal }) =>
      toast(() => (
        <Trans
          i18nKey={'journal:addJournal.toast'}
          components={{
            b: <b />,
          }}
          values={addJournal}
        />
      )),
    refetchQueries: [
      {
        query: JournalsDocument,
        variables: {
          input: { branchId: currentBranch?.id },
        },
      },
    ],
  })

  const handleSubmit = ({
    accrualDate,
    entries,
    ...rest
  }: AddJournalFormValues) => {
    void addJournal({
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

  const entries = watch('entries')

  const totalDebit = entries.reduce(
    (acc, cur) => acc + Number(removeFormatting(cur.debit)),
    0,
  )
  const totalCredit = entries.reduce(
    (acc, cur) => acc + Number(removeFormatting(cur.credit)),
    0,
  )

  const status = entries.some((entry) => entry.status === EntryStatus.PENDING)
    ? EntryStatus.PENDING
    : EntryStatus.COMPLETED

  useEffect(() => {
    if (currentBranch) {
      setValue('tags', [])
      setValue('links', [])
      setValue('branchId', currentBranch?.id)
    }
  }, [setValue, currentBranch, context.formState.isSubmitSuccessful])

  return (
    <Form
      context={{ setValue, control, watch, ...context }}
      onSubmit={handleSubmit}
      className="w-[45rem]"
    >
      <Card className="w-full" loading={currentBranch == null}>
        <div className="flex flex-col gap-y-2">
          <Form.Date<AddJournalFormValues>
            label={t`addJournal.label.accrualDate`}
            name="accrualDate"
            placeholder={t`addJournal.placeholder.accrualDate`}
          />
          <Form.Input<AddJournalFormValues>
            label={t`addJournal.label.note`}
            name="note"
            placeholder={t`addJournal.placeholder.note`}
          />
          <Form.MultiSelect<AddJournalFormValues, string>
            label={t`addJournal.label.tags`}
            name="tags"
            placeholder={t`addJournal.placeholder.tags`}
            {...tagsMultiSelect}
          />
          <Form.MultiSelect<AddJournalFormValues, string>
            label={t`addJournal.label.links`}
            name="links"
            placeholder={t`addJournal.placeholder.links`}
            {...linksMultiSelect}
          />
          <Form.Static<AddJournalFormValues>
            label={t`addJournal.label.branchId`}
            name="branchId"
          />
        </div>
        <div className="border-b-mid-gray mt-14 border-b">
          <h4 className="text-gray mt-6 text-[0.625rem] font-medium">{t`addJournal.label.entries.title`}</h4>
        </div>
        <div className="border-mid-gray flex h-96 gap-x-2 border-b">
          <div className="border-mid-gray flex size-full min-w-80 max-w-80 flex-col items-start overflow-scroll border-r">
            {fields.map(({ id }, index) => {
              const entry = watch(`entries.${index}`)

              return (
                <JournalFormEntry
                  key={id}
                  index={index}
                  entry={{
                    ...entry,
                    account:
                      accounts?.find(
                        (account) => account.id === entry.accountId,
                      )?.name ?? '',
                  }}
                  active={index === activeEntry}
                  error={context.formState.errors.entries?.at?.(index) != null}
                  onSelect={handleOnEntrySelect(index)}
                  onRemove={handleOnEntryRemove(index)}
                />
              )
            })}
            <ButtonCore
              className="text-light-accent hover:text-light-accent/80 hover:bg-mid-gray/20 mb-10 size-fit max-h-fit text-nowrap py-4 text-xs font-medium"
              onClick={handleOnEntryAppend}
            >
              {t`addJournal.addEntry`}
            </ButtonCore>
          </div>
          <AddJournalEntry index={activeEntry} key={activeEntry} />
        </div>
        <div className="text-gray flex flex-col text-[0.625rem] leading-4">
          <span>
            {t('addJournal.totalDebit', {
              debit: format(totalDebit.toString()),
            })}
          </span>
          <span>
            {t('addJournal.totalCredit', {
              credit: format(totalCredit.toString()),
            })}
          </span>
          <span>
            {t('addJournal.diff', {
              diff: format((totalDebit - totalCredit).toString()),
            })}
          </span>
          <span>
            {t('addJournal.status', {
              status: t(`entryStatus.${status}`),
            })}
          </span>
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addJournal.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
