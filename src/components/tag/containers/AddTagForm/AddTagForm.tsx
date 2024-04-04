import { Trans, useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { z } from 'zod'

import {
  LinkType,
  TagType,
  TagsDocument,
  useAddTagMutation,
} from '@/api/graphql'
import { Card } from '@/components/core'
import { Form } from '@/components/core/containers'
import { useCurrentBranch, useForm } from '@/components/core/hooks'
import { useToaster } from '@/hooks'
import { generateDropdownSchema } from '@/shared/zod/generators'
import { nameSchema } from '@/shared/zod/schemas'

import { useTagTypeDropdownItems } from '../../hooks'

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
   * Link type
   */
  type: generateDropdownSchema(TagType),
})

export type AddTagFormValues = z.infer<typeof schema>

export const AddTagForm: React.FC = () => {
  const { t } = useTranslation('tag')
  const toast = useToaster()
  const [currentBranch] = useCurrentBranch()
  const tagTypeItems = useTagTypeDropdownItems()
  const { setValue, ...context } = useForm<AddTagFormValues>({
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

  const handleSubmit = ({ type, ...rest }: AddTagFormValues) => {
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
      setValue('branchId', currentBranch.id)
    }
  }, [setValue, currentBranch])

  return (
    <Form
      context={{ setValue, ...context }}
      onSubmit={handleSubmit}
      className="w-fit"
    >
      <Card className="w-80">
        <div className="space-y-1">
          <Form.Input<AddTagFormValues>
            label={t`addTag.label.name`}
            name="name"
            placeholder={t`addTag.placeholder.name`}
          />
          <Form.Dropdown<AddTagFormValues, TagType>
            label={t`addTag.label.type`}
            name="type"
            items={tagTypeItems}
            placeholder={t`addTag.placeholder.type`}
          />
          <Form.Static<AddTagFormValues>
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
