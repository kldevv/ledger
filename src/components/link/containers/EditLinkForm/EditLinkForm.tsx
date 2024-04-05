import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  LinkDocument,
  LinkType,
  useLinkQuery,
  useUpdateLinkMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useForm } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { formatDate } from '@/shared/utils'
import { generateDropdownSchema } from '@/shared/zod/generators'
import { nameSchema } from '@/shared/zod/schemas'

import { useLinkTypeDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Link id
   */
  id: z.string(),
  /**
   * Link name
   */
  name: nameSchema,
  /**
   * Link type
   */
  type: generateDropdownSchema(LinkType),
  /**
   * Link created at
   */
  createdAt: z.string(),
  /**
   * Link updated at
   */
  updatedAt: z.string(),
})

export type EditLinkFormValues = z.infer<typeof schema>

export const EditLinkForm: React.FC = () => {
  const { t } = useTranslation('link')
  const {
    query: { id: _id },
  } = useRouter()
  const id = Array.isArray(_id) ? _id.at(0) : _id
  const toast = useToaster()
  const linkTypeDropdown = useLinkTypeDropdown()
  const { data: { link } = {}, loading: queryLoading } = useLinkQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const context = useForm<EditLinkFormValues>({
    schema,
    values: {
      id: link?.id ?? '',
      name: link?.name ?? '',
      type: link?.type ?? null,
      createdAt: formatDate(link?.createdAt),
      updatedAt: formatDate(link?.updatedAt),
    },
  })

  const [updateLink, { loading }] = useUpdateLinkMutation({
    onCompleted: ({ updateLink }) =>
      toast(() => (
        <Trans
          i18nKey={'link:editLink.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: updateLink.name }}
        />
      )),
    refetchQueries: [
      {
        query: LinkDocument,
        variables: {
          input: { id },
        },
      },
    ],
  })

  const handleSubmit = ({ id, name, type }: EditLinkFormValues) => {
    if (type == null) return null

    void updateLink({
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
        <div className="space-y-1">
          <Form.Static<EditLinkFormValues>
            label={t`editLink.label.id`}
            name="id"
          />
          <Form.Input<EditLinkFormValues>
            label={t`editLink.label.name`}
            name="name"
          />
          <Form.Dropdown<EditLinkFormValues, LinkType>
            {...linkTypeDropdown}
            label={t`editLink.label.type`}
            name="type"
          />
          <Form.Static<EditLinkFormValues>
            label={t`editLink.label.createdAt`}
            name="createdAt"
          />
          <Form.Static<EditLinkFormValues>
            label={t`editLink.label.updatedAt`}
            name="updatedAt"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`editLink.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
