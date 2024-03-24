import { useTranslation } from 'next-i18next'
import { z } from 'zod'

import { LinkType } from '@/api/graphql'
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
  type: z.nativeEnum(LinkType),
})

export type AddLinkFormValues = z.infer<typeof schema>

export const AddLinkForm = () => {
  const { t } = useTranslation('link')
  const context = useForm<AddLinkFormValues>({
    schema,
  })

  return (
    <Form context={context} onSubmit={() => null} className="w-fit">
      <div className="space-y-1">
        <Form.Input<AddLinkFormValues>
          label={t`addLinkForm.label.name`}
          name="name"
          placeholder="addLinkForm.placeholder.name"
        />
        <Form.Input<AddLinkFormValues>
          label={t`addLinkForm.label.type`}
          name="type"
          placeholder="Enter link name"
        />
      </div>
      <Form.Submit className="mt-8 w-full">Submit</Form.Submit>
    </Form>
  )
}
