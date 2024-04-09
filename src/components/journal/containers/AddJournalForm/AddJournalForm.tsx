import { Trans, useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { z } from 'zod'

import { JournalsDocument, useAddJournalMutation } from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useCurrentBranch, useForm } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { nameSchema } from '@/shared/zod/schemas'

const schema = z.object({
  /**
   * Accrual date
   */
  accrualDate: z.date(),
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
  const journalGroupDropdown = useJournalGroupDropdown()
  const { setValue, ...context } = useForm<AddJournalFormValues>({
    schema,
    defaultValues: {
      name: '',
      branchId: '',
      journalGroupId: '',
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
          values={{ name: addJournal.name }}
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

  const handleSubmit = (values: AddJournalFormValues) => {
    void addJournal({
      variables: {
        input: values,
      },
    })
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
      <Card className="w-80">
        <div className="space-y-1">
          <Form.Input<AddJournalFormValues>
            label={t`addJournal.label.name`}
            name="name"
            placeholder={t`addJournal.placeholder.name`}
          />
          <Form.Dropdown<AddJournalFormValues, string>
            {...journalGroupDropdown}
            label={t`addJournal.label.journalGroupId`}
            name="journalGroupId"
            placeholder={t`addJournal.placeholder.journalGroupId`}
          />
          <Form.Static<AddJournalFormValues>
            label={t`addJournal.label.branchId`}
            name="branchId"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addJournal.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
