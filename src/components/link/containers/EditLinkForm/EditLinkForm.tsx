import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  LinkDocument,
  LinkType,
  useLinkQuery,
  useUpdateLinkMutation,
} from '@/api/graphql'
import { Card } from '@/components/core'
import { Form } from '@/components/core/containers'
import { useForm } from '@/components/core/hooks'
import { useToaster } from '@/hooks'
import { formatDate } from '@/shared'

const schema = z.object({
  /**
   * Link id
   */
  id: z.string(),
  /**
   * Link name
   */
  name: z.string().min(3),
  /**
   * Link type
   */
  type: z.nativeEnum(LinkType).nullable(),
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
  const { data } = useLinkQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const context = useForm<EditLinkFormValues>({
    schema,
    defaultValues: {
      id: '',
      name: '',
      type: null,
      createdAt: '',
      updatedAt: '',
    },
    values:
      data?.link != null
        ? {
            ...data.link,
            createdAt: formatDate(data.link.createdAt),
            updatedAt: formatDate(data.link.updatedAt),
          }
        : undefined,
  })

  const [updateLink, { loading }] = useUpdateLinkMutation({
    onCompleted: ({ updateLink }) =>
      toast(() => (
        <Trans
          i18nKey={'link:editLinkForm.toast'}
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
      <Card className="w-80">
        <div className="space-y-1">
          <Form.Static<EditLinkFormValues>
            label={t`editLinkForm.label.id`}
            name="id"
          />
          <Form.Input<EditLinkFormValues>
            label={t`editLinkForm.label.name`}
            name="name"
          />
          <Form.Dropdown<EditLinkFormValues, string>
            label={t`editLinkForm.label.type`}
            name="type"
            items={[LinkType.GENERAL, LinkType.FX].map((type) => ({
              id: type,
              value: type,
              title: t(`editLinkForm.linkType.${type}`),
            }))}
          />
          <Form.Static<EditLinkFormValues>
            label={t`editLinkForm.label.createdAt`}
            name="createdAt"
          />
          <Form.Static<EditLinkFormValues>
            label={t`editLinkForm.label.updatedAt`}
            name="updatedAt"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`editLinkForm.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
