import { Trans, useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { z } from 'zod'

import {
  AccountingType,
  LinkType,
  TagsDocument,
  useAddTagMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useCurrentBranch, useForm } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { generateDropdownSchema } from '@/shared/zod/generators'
import { nameSchema } from '@/shared/zod/schemas'

import type { TagType } from '@/api/graphql'

const schema = z.object({
  /**
   * Link name
   */
  name: nameSchema,
  /**
   * Branch id
   */
  branchId: z.string(),
  /**
   * Accounting type
   */
  type: generateDropdownSchema(AccountingType),
})

export type AddAccountGroupFormValues = z.infer<typeof schema>

export const AddAccountGroupForm: React.FC = () => {
  const { t } = useTranslation('accountGroup')
  const toast = useToaster()
  const [currentBranch] = useCurrentBranch()
  const { setValue, ...context } = useForm<AddAccountGroupFormValues>({
    schema,
    defaultValues: {
      name: '',
      type: null,
      branchId: '',
    },
  })

  const [addTag, { loading }] = useAddTagMutation({
    onCompleted: ({ addTag }) =>
      toast(() => (
        <Trans
          i18nKey={'tag:addTag.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: addTag.name }}
        />
      )),
    refetchQueries: [
      {
        query: TagsDocument,
        variables: {
          input: { branchId: currentBranch?.id },
        },
      },
    ],
  })

  const handleSubmit = ({ type, ...rest }: AddAccountGroupFormValues) => {
    void addTag({
      variables: {
        input: {
          ...rest,
          type: type ?? LinkType.GENERAL,
        },
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
          <Form.Input<AddAccountGroupFormValues>
            label={t`addTag.label.name`}
            name="name"
            placeholder={t`addTag.placeholder.name`}
          />
          <Form.Dropdown<AddAccountGroupFormValues, TagType>
            {...tagTypeDropdown}
            label={t`addTag.label.type`}
            name="type"
            placeholder={t`addTag.placeholder.type`}
          />
          <Form.Static<AddAccountGroupFormValues>
            label={t`addTag.label.branchId`}
            name="branchId"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addTag.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
