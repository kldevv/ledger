import { useSession } from 'next-auth/react'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import { LinkType, LinksDocument, useAddLinkMutation } from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useForm, useToaster } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { nameSchema } from '@/shared/zod/schemas'
import { generateDropdownSchema } from '@/shared/zod/schemas/generators'

import { useLinkTypeDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Link name
   */
  name: nameSchema,
  /**
   * Link type
   */
  type: generateDropdownSchema(LinkType),
})

export type AddLinkFormValues = z.infer<typeof schema>

export const AddLinkForm: React.FC = () => {
  const { t } = useTranslation('link')
  const { data: session } = useSession()
  const toast = useToaster()
  const linkTypeDropdown = useLinkTypeDropdown()
  const context = useForm<AddLinkFormValues>({
    schema,
    defaultValues: {
      name: '',
      type: null,
    },
  })

  const [addLink, { loading, data }] = useAddLinkMutation({
    onCompleted: ({ addLink }) =>
      toast(() => (
        <Trans
          i18nKey={'link:addLink.toast'}
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
          input: { userId: session?.user.id ?? '' },
        },
      },
    ],
  })

  console.log(data)

  const handleSubmit = ({ type, ...rest }: AddLinkFormValues) => {
    void addLink({
      variables: {
        input: {
          ...rest,
          userId: session?.user.id ?? '',
          type: type ?? LinkType.GENERAL,
        },
      },
    })
  }

  return (
    <Form context={context} onSubmit={handleSubmit} className="w-fit">
      <Card className="w-80">
        <div className="flex flex-col gap-y-2">
          <Form.Input<AddLinkFormValues>
            label={t`addLink.label.name`}
            name="name"
            placeholder={t`addLink.placeholder.name`}
          />
          <Form.Dropdown<AddLinkFormValues, LinkType>
            {...linkTypeDropdown}
            label={t`addLink.label.type`}
            name="type"
            placeholder={t`addLink.placeholder.type`}
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addLink.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
