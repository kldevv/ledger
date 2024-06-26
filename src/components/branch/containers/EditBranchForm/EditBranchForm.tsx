import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  BranchesDocument,
  Currency,
  useBranchQuery,
  useUpdateBranchMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useForm, useToaster } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { formatDate } from '@/shared/utils'
import { nameSchema } from '@/shared/zod/schemas'
import { generateDropdownSchema } from '@/shared/zod/schemas/generators'

import { useCurrencyDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Branch id
   */
  id: z.string(),
  /**
   * Branch nam
   */
  name: nameSchema,
  /**
   * Branch currency
   */
  currency: generateDropdownSchema(Currency),
  /**
   * Branch created at
   */
  createdAt: z.string(),
  /**
   * Branch updated at
   */
  updatedAt: z.string(),
})

export type EditBranchFormValues = z.infer<typeof schema>

export const EditBranchForm: React.FC = () => {
  const { t } = useTranslation('branch')
  const { data: session } = useSession()
  const {
    query: { id: _id },
  } = useRouter()
  const id = Array.isArray(_id) ? _id.at(0) : _id
  const toast = useToaster()
  const currencyDropdown = useCurrencyDropdown()
  const { data: { branch } = {}, loading: queryLoading } = useBranchQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const context = useForm<EditBranchFormValues>({
    disableReset: true,
    schema,
    values: {
      id: branch?.id ?? '',
      name: branch?.name ?? '',
      currency: branch?.currency ?? null,
      createdAt: formatDate(branch?.createdAt),
      updatedAt: formatDate(branch?.updatedAt),
    },
  })

  const [updateBranch, { loading }] = useUpdateBranchMutation({
    onCompleted: ({ updateBranch }) => {
      context.reset()
      toast(() => (
        <Trans
          i18nKey={'branch:editBranch.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: updateBranch.name }}
        />
      ))
    },
    refetchQueries: [
      {
        query: BranchesDocument,
        variables: {
          input: { userId: session?.user.id ?? '' },
        },
      },
    ],
  })

  const handleSubmit = ({ id, name, currency }: EditBranchFormValues) => {
    void updateBranch({
      variables: {
        input: {
          id,
          name,
          currency: currency ?? Currency.USD,
        },
      },
    })
  }

  return (
    <Form context={context} onSubmit={handleSubmit} className="w-fit">
      <Card className="w-80" loading={queryLoading}>
        <div className="flex flex-col gap-y-2">
          <Form.Static<EditBranchFormValues>
            label={t`editBranch.label.id`}
            name="id"
          />
          <Form.Input<EditBranchFormValues>
            label={t`editBranch.label.name`}
            name="name"
            placeholder={t`editBranch.placeholder.name`}
          />
          <Form.Dropdown<EditBranchFormValues, Currency>
            {...currencyDropdown}
            label={t`editBranch.label.currency`}
            name="currency"
            placeholder={t`editBranch.placeholder.currency`}
          />
          <Form.Static<EditBranchFormValues>
            label={t`editBranch.label.createdAt`}
            name="createdAt"
          />
          <Form.Static<EditBranchFormValues>
            label={t`editBranch.label.updatedAt`}
            name="updatedAt"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`editBranch.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
