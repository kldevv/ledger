import { useSession } from 'next-auth/react'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import { BranchesDocument, Currency, useAddBranchMutation } from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useForm, useToaster } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { nameSchema } from '@/shared/zod/schemas'
import { generateDropdownSchema } from '@/shared/zod/schemas/generators'

import { useCurrencyDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Branch nam
   */
  name: nameSchema,
  /**
   * Branch currency
   */
  currency: generateDropdownSchema(Currency),
})

export type AddBranchFormValues = z.infer<typeof schema>

export const AddBranchForm: React.FC = () => {
  const { t } = useTranslation('branch')
  const toast = useToaster()
  const { data: session } = useSession()
  const currencyDropdown = useCurrencyDropdown()
  const [addBranch, { loading }] = useAddBranchMutation({
    onCompleted: ({ addBranch }) =>
      toast(() => (
        <Trans
          i18nKey={'branch:addBranch.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: addBranch.name }}
        />
      )),
    refetchQueries: [
      {
        query: BranchesDocument,
        variables: {
          input: { userId: session?.user.id ?? '' },
        },
      },
    ],
  })
  const context = useForm<AddBranchFormValues>({
    schema,
    defaultValues: {
      name: '',
      currency: null,
    },
  })

  const handleSubmit = ({ currency, ...rest }: AddBranchFormValues) => {
    void addBranch({
      variables: {
        input: {
          ...rest,
          currency: currency ?? Currency.USD,
          userId: session?.user.id ?? '',
        },
      },
    })
  }

  return (
    <Form context={context} onSubmit={handleSubmit} className="w-fit">
      <Card className="w-80">
        <div className="flex flex-col gap-y-2">
          <Form.Input<AddBranchFormValues>
            label={t`addBranch.label.name`}
            name="name"
            placeholder={t`addBranch.placeholder.name`}
          />
          <Form.Dropdown<AddBranchFormValues, Currency>
            {...currencyDropdown}
            label={t`addBranch.label.currency`}
            name="currency"
            placeholder={t`addBranch.placeholder.currency`}
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addBranch.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
