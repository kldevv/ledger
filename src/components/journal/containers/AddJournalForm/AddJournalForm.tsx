import { EntryStatus } from '@prisma/client'
import classNames from 'classnames'
import { Trans, useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { z } from 'zod'

import { JournalsDocument, useAddJournalMutation } from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useCurrentBranch, useForm } from '@/components/core/hooks'
import { ButtonCore, Card, Icon } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { formatDate } from '@/shared/utils'
import { dateSchema } from '@/shared/zod/schemas'

import { useTagsMultiSelect, useLinksMultiSelect } from '../../hooks'

import { AddJournalEntry } from './AddJournalForm.Entry/AddJournalForm.Entry'

const schema = z.object({
  /**
   * Accrual date
   */
  accrualDate: dateSchema,
  /**
   * Journal note
   */
  note: z
    .string()
    .min(5, { message: 'note.min' })
    .max(50, { message: 'note.max' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'note.regex' }),
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
      memo: z
        .string()
        .max(50, { message: 'memo.max' })
        .regex(/^[a-zA-Z0-9\s]*$/, { message: 'memo.regex' }),
      /**
       * Entry debit
       */
      debit: z.string(),
      /**
       * Entry credit
       */
      credit: z.string(),
      /**
       * Entry account
       */
      accountId: z.string(),
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
  const [currentBranch] = useCurrentBranch()
  const [entryIndex, setEntryIndex] = useState(0)
  const { setValue, control, watch, ...context } =
    useForm<AddJournalFormValues>({
      schema,
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
    control,
  })

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
              transactionDate: new Date(transactionDate),
              credit: Number(credit),
              debit: Number(debit),
              ...rest,
            }),
          ),
          ...rest,
        },
      },
    })
  }

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
      className="w-full"
    >
      <Card className="w-[45rem]" loading={currentBranch == null}>
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
        <div className="border-mid-gray flex h-80 gap-x-2 border-b">
          <div className="border-mid-gray flex size-full min-w-80 max-w-80 flex-col items-start overflow-scroll border-r">
            {fields.map(({ id }, index) => (
              <div
                key={id}
                className="border-mid-gray flex w-full max-w-full border-b px-2"
              >
                <ButtonCore
                  onClick={() => setEntryIndex(index)}
                  className={classNames(
                    'border-mid-gray hover:text-dark-shades/60 flex h-fit w-full py-2 pr-2 text-xs max-w-full items-start',
                    { 'font-semibold': index === entryIndex },
                  )}
                >
                  <span className="text-gray min-w-5 text-left">{index}</span>
                  <div className="flex max-w-full flex-col items-start">
                    <div className="flex min-h-4 max-w-full items-start truncate">
                      <span>{watch(`entries.${index}.transactionDate`)}</span>
                    </div>
                    <div className="min-h-4 max-w-36 truncate text-left">
                      {watch(`entries.${index}.accountId`)}
                    </div>
                    <div className="text-gray max-w-36 truncate text-left text-xs">
                      {watch(`entries.${index}.memo`)}
                    </div>
                  </div>
                  <div className="ml-auto flex max-w-24 flex-col items-end truncate pl-5">
                    <span className="flex items-center gap-x-1">
                      <span className="max-w-20 truncate">
                        {watch(`entries.${index}.debit`)}
                      </span>
                      <span>D</span>
                    </span>
                    <span className="flex items-center gap-x-1">
                      <span className="max-w-20 truncate">
                        {watch(`entries.${index}.credit`)}
                      </span>
                      <span>C</span>
                    </span>
                  </div>
                </ButtonCore>
                <ButtonCore
                  onClick={() => remove(index)}
                  className="hover:text-light-accent size-full min-w-fit max-w-fit"
                >
                  <Icon.Solid name="XMark" />
                </ButtonCore>
              </div>
            ))}
            <ButtonCore
              className="text-light-accent hover:text-light-accent/80 hover:bg-mid-gray/20 mb-10 size-fit max-h-fit text-nowrap py-4 text-xs font-medium"
              onClick={() => append(defaultEntryValue)}
              type="button"
            >
              Add Entry
            </ButtonCore>
          </div>
          <AddJournalEntry index={entryIndex} key={entryIndex} />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addJournal.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
