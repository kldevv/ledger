import { Trans, useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { z } from 'zod'

import {
  JournalsDocument,
  useAddJournalMutation,
  useTagsQuery,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useCurrentBranch, useForm } from '@/components/core/hooks'
import { Card, Input } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { tagTypeToSolidIconName } from '@/shared/utils'
import { dateSchema, nameSchema } from '@/shared/zod/schemas'

const schema = z.object({
  /**
   * Accrual date
   */
  accrualDate: dateSchema,
  /**
   * Journal note
   */
  note: nameSchema,
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
})

export type AddJournalFormValues = z.infer<typeof schema>

export const AddJournalForm: React.FC = () => {
  const { t } = useTranslation('journal')
  const toast = useToaster()
  const [currentBranch] = useCurrentBranch()
  const { setValue, ...context } = useForm<AddJournalFormValues>({
    schema,
    defaultValues: {
      accrualDate: '',
      note: '',
      branchId: '',
      tags: [],
      links: [],
    },
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

  const { data: { tags } = {} } = useTagsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch == null,
  })

  const handleSubmit = (values: AddJournalFormValues) => {
    // void addJournal({
    //   variables: {
    //     input: values,
    //   },
    // })
  }

  useEffect(() => {
    if (currentBranch) {
      setValue('branchId', currentBranch?.id)
    }
  }, [setValue, currentBranch, context.formState.isSubmitSuccessful])

  return (
    <Form
      context={{ setValue, ...context }}
      onSubmit={handleSubmit}
      className="w-fit"
    >
      <Card className="w-[37rem]">
        <div className="gap-y-1">
          <Form.Date<AddJournalFormValues>
            label={t`addJournal.label.accrualDate`}
            name="accrualDate"
            placeholder={t`addJournal.placeholder.note`}
          />
          <Form.Input<AddJournalFormValues>
            label={t`addJournal.label.note`}
            name="note"
            placeholder={t`addJournal.placeholder.note`}
          />
          <Form.Static<AddJournalFormValues>
            label={t`addJournal.label.branchId`}
            name="branchId"
          />
          <Form.MultiSelect<AddJournalFormValues, string>
            label={t`addJournal.label.tags`}
            name="tags"
            items={
              tags?.map(({ name, id, type }) => ({
                value: id,
                title: name,
                solidIcon: tagTypeToSolidIconName(type),
              })) ?? []
            }
          />
        </div>
        <div className="mt-6 flex flex-col gap-y-4 overflow-x-scroll pb-4">
          <div className="flex w-full gap-x-2">
            <Input className="min-w-fit border-0 pr-4" label="Index">
              <Input.Static className="h-5 w-fit">1</Input.Static>
            </Input>
            <Form.Date<AddJournalFormValues>
              name="branchId"
              label="Trasaction Date"
            />
            <Form.Input<AddJournalFormValues> name="branchId" label="456" />
            <Form.Input<AddJournalFormValues> name="note" label="786" />
            <Form.Input<AddJournalFormValues> name="note" label="132313123" />
            <Form.Input<AddJournalFormValues>
              name="note"
              label="123123123123123"
            />
          </div>
          <div className="flex w-full gap-x-2">
            <Input className="min-w-fit border-0 pr-4">
              <Input.Static className="h-5 w-fit">2</Input.Static>
            </Input>
            <Form.Date<AddJournalFormValues> name="note" />
            <Form.Input<AddJournalFormValues> name="note" />
            <Form.Input<AddJournalFormValues> name="note" />
            <Form.Input<AddJournalFormValues> name="note" />
            <Form.Input<AddJournalFormValues> name="note" />
          </div>
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addJournal.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
