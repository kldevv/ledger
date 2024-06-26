import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  TagDocument,
  TagType,
  useTagQuery,
  useUpdateTagMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useForm, useToaster } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { formatDate } from '@/shared/utils'
import { nameSchema } from '@/shared/zod/schemas'
import { generateDropdownSchema } from '@/shared/zod/schemas/generators'

import { useTagTypeDropdown } from '../../hooks'

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
  const tagTypeDropdown = useTagTypeDropdown()
  const toast = useToaster()
  const { data: { tag } = {}, loading: queryLoading } = useTagQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const context = useForm<EditTagFormValues>({
    disableReset: true,
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
    onCompleted: ({ updateTag }) => {
      context.reset()
      toast(() => (
        <Trans
          i18nKey={'tag:editTag.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: updateTag.name }}
        />
      ))
    },
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
      <Card className="w-80" loading={queryLoading}>
        <div className="flex flex-col gap-y-2">
          <Form.Static<EditTagFormValues>
            label={t`editTag.label.id`}
            name="id"
          />
          <Form.Input<EditTagFormValues>
            label={t`editTag.label.name`}
            name="name"
          />
          <Form.Dropdown<EditTagFormValues, TagType>
            {...tagTypeDropdown}
            label={t`editTag.label.type`}
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
