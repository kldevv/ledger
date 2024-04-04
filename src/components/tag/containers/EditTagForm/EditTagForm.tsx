import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  TagDocument,
  TagType,
  useTagQuery,
  useUpdateTagMutation,
} from '@/api/graphql'
import { Card } from '@/components/core'
import { Form } from '@/components/core/containers'
import { useForm } from '@/components/core/hooks'
import { useToaster } from '@/hooks'
import { formatDate } from '@/shared/utils'
import { generateDropdownSchema } from '@/shared/zod/generators'
import { nameSchema } from '@/shared/zod/schemas'

import { useTagTypeDropdownItems } from '../../hooks'

const schema = z.object({
  /**
   * Tag id
   */
  id: z.string(),
  /**
   * Tag name
   */
  name: nameSchema,
  /**
   * Tag type
   */
  type: generateDropdownSchema(TagType),
  /**
   * Branch id
   */
  branchId: z.string(),
  /**
   * Tag created at
   */
  createdAt: z.string(),
  /**
   * Tag updated at
   */
  updatedAt: z.string(),
})

export type EditTagFormValues = z.infer<typeof schema>

export const EditTagForm: React.FC = () => {
  const { t } = useTranslation('tag')
  const {
    query: { id: _id },
  } = useRouter()
  const id = Array.isArray(_id) ? _id.at(0) : _id
  const tagTypeItems = useTagTypeDropdownItems()
  const toast = useToaster()
  const { data: { tag } = {} } = useTagQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const context = useForm<EditTagFormValues>({
    schema,
    values: {
      id: tag?.id ?? '',
      name: tag?.name ?? '',
      type: tag?.type ?? null,
      branchId: tag?.branchId ?? '',
      createdAt: formatDate(tag?.createdAt),
      updatedAt: formatDate(tag?.updatedAt),
    },
  })

  const [updateTag, { loading }] = useUpdateTagMutation({
    onCompleted: ({ updateTag }) =>
      toast(() => (
        <Trans
          i18nKey={'tag:editTag.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: updateTag.name }}
        />
      )),
    refetchQueries: [
      {
        query: TagDocument,
        variables: {
          input: { id },
        },
      },
    ],
  })

  const handleSubmit = ({ id, name, type }: EditTagFormValues) => {
    if (type == null) return null

    void updateTag({
      variables: {
        input: {
          id,
          name,
          type,
        },
      },
    })
  }

  return (
    <Form context={context} onSubmit={handleSubmit} className="w-fit">
      <Card className="w-80">
        <div className="space-y-1">
          <Form.Static<EditTagFormValues>
            label={t`editTag.label.id`}
            name="id"
          />
          <Form.Input<EditTagFormValues>
            label={t`editTag.label.name`}
            name="name"
          />
          <Form.Dropdown<EditTagFormValues, TagType>
            label={t`editTag.label.type`}
            items={tagTypeItems}
            name="type"
          />
          <Form.Static<EditTagFormValues>
            label={t`editTag.label.branchId`}
            name="branchId"
          />
          <Form.Static<EditTagFormValues>
            label={t`editTag.label.createdAt`}
            name="createdAt"
          />
          <Form.Static<EditTagFormValues>
            label={t`editTag.label.updatedAt`}
            name="updatedAt"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`editTag.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
