import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import { LinkType, LinksDocument, useAddLinkMutation } from '@/api/graphql'
import { Card } from '@/components/core'
import { Form } from '@/components/core/containers'
import { useForm } from '@/components/core/hooks'
import { useToaster } from '@/hooks'

import { DropdownLinkType } from '../../presentationals'

const schema = z.object({
  /**
   * Link name
   */
  name: z.string().min(3),
  /**
   * Link type
   */
  type: z
    .nativeEnum(LinkType)
    .nullable()
    .refine((value) => value != null),
})

export type AddLinkFormValues = z.infer<typeof schema>

export const AddLinkForm: React.FC = () => {
  const { t } = useTranslation('link')
  const toast = useToaster()
  const context = useForm<AddLinkFormValues>({
    schema,
    defaultValues: {
      name: '',
      type: null,
    },
  })

  const [addLink, { loading }] = useAddLinkMutation({
    onCompleted: ({ addLink }) =>
      toast(() => (
        <Trans
          i18nKey={'link:addLinkForm.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: addLink.name }}
        />
      )),
    refetchQueries: [
      {
        query: LinksDocument,
        variables: {
          input: { userId: '81087108-3748-446a-b033-a85d7c9ace7b' },
        },
      },
    ],
  })

  const handleSubmit = ({ name, type }: AddLinkFormValues) => {
    void addLink({
      variables: {
        input: {
          userId: '81087108-3748-446a-b033-a85d7c9ace7b',
          name,
          type: type ?? LinkType.GENERAL,
        },
      },
    })
  }

  return (
    <Form context={context} onSubmit={handleSubmit} className="w-fit">
      <Card className="w-80">
        <div className="space-y-1">
          <Form.Input<AddLinkFormValues>
            label={t`addLinkForm.label.name`}
            name="name"
            placeholder={t`addLinkForm.placeholder.name`}
          />
          <DropdownLinkType<AddLinkFormValues>
            label={t`addLinkForm.label.type`}
            name="type"
            placeholder={t`addLinkForm.placeholder.type`}
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addLinkForm.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
