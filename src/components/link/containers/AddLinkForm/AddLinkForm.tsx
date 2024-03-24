import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import { LinkType } from '@/api/graphql'
import { Card } from '@/components/core'
import { Form } from '@/components/core/containers'
import { useForm } from '@/components/core/hooks'

const schema = z.object({
  /**
   * Link name
   */
  name: z.string().min(3),
  /**
   * Link type
   */
  type: z.nativeEnum(LinkType).nullable(),
})

export type AddLinkFormValues = z.infer<typeof schema>

export const AddLinkForm: React.FC = () => {
  const { t } = useTranslation('link')
  const context = useForm<AddLinkFormValues>({
    schema,
    defaultValues: {
      name: '',
      type: null,
    },
  })

  return (
    <Form
      context={context}
      onSubmit={(value) => console.log(value)}
      className="w-fit"
    >
      <Card className="w-72">
        <div className="space-y-1">
          <Form.Input<AddLinkFormValues>
            label={t`addLinkForm.label.name`}
            name="name"
            placeholder={t`addLinkForm.placeholder.name`}
          />
          <Form.Dropdown<AddLinkFormValues, string>
            label={t`addLinkForm.label.type`}
            name="type"
            placeholder={t`addLinkForm.placeholder.type`}
            items={[LinkType.GENERAL, LinkType.FX].map((type) => ({
              id: type,
              value: type,
              title: t(`addLinkForm.linkType.${type}`),
            }))}
          />
        </div>
        <Form.Submit className="mt-8 w-full">{t`addLinkForm.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
