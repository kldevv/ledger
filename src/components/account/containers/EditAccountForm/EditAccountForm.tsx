import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  AccountDocument,
  useAccountQuery,
  useUpdateAccountMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useForm } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { formatDate } from '@/shared/utils'
import { nameSchema } from '@/shared/zod/schemas'

import { useAccountGroupDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Account id
   */
  id: z.string(),
  /**
   * Account name
   */
  name: nameSchema,
  /**
   * Account group id
   */
  accountGroupId: z.string(),
  /**
   * Branch id
   */
  branchId: z.string(),
  /**
   * Account created at
   */
  createdAt: z.string(),
  /**
   * Account updated at
   */
  updatedAt: z.string(),
})

export type EditAccountFormValues = z.infer<typeof schema>

export const EditAccountForm: React.FC = () => {
  const { t } = useTranslation('account')
  const {
    query: { id: _id },
  } = useRouter()
  const id = Array.isArray(_id) ? _id.at(0) : _id
  const accountGroupDropdown = useAccountGroupDropdown()
  const toast = useToaster()
  const { data: { account } = {}, loading: queryLoading } = useAccountQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const context = useForm<EditAccountFormValues>({
    schema,
    values: {
      id: account?.id ?? '',
      name: account?.name ?? '',
      accountGroupId: account?.group.id ?? '',
      branchId: account?.branchId ?? '',
      createdAt: formatDate(account?.createdAt),
      updatedAt: formatDate(account?.updatedAt),
    },
  })

  const [updateAccount, { loading }] = useUpdateAccountMutation({
    onCompleted: ({ updateAccount }) =>
      toast(() => (
        <Trans
          i18nKey={'account:editAccount.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: updateAccount.name }}
        />
      )),
    refetchQueries: [
      {
        query: AccountDocument,
        variables: {
          input: { id },
        },
      },
    ],
  })

  const handleSubmit = ({
    id,
    name,
    accountGroupId,
  }: EditAccountFormValues) => {
    void updateAccount({
      variables: {
        input: {
          id,
          name,
          accountGroupId,
        },
      },
    })
  }

  return (
    <Form context={context} onSubmit={handleSubmit} className="w-fit">
      <Card className="w-80" loading={queryLoading}>
        <div className="space-y-1">
          <Form.Static<EditAccountFormValues>
            label={t`editAccount.label.id`}
            name="id"
          />
          <Form.Input<EditAccountFormValues>
            label={t`editAccount.label.name`}
            name="name"
          />
          <Form.Dropdown<EditAccountFormValues, string>
            {...accountGroupDropdown}
            label={t`editAccount.label.type`}
            name="accountGroupId"
          />
          <Form.Static<EditAccountFormValues>
            label={t`editAccount.label.branchId`}
            name="branchId"
          />
          <Form.Static<EditAccountFormValues>
            label={t`editAccount.label.createdAt`}
            name="createdAt"
          />
          <Form.Static<EditAccountFormValues>
            label={t`editAccount.label.updatedAt`}
            name="updatedAt"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`editAccount.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
