import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { z } from 'zod'

import {
  AccountingType,
  AccountGroupDocument,
  useAccountGroupQuery,
  useUpdateAccountGroupMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useForm } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { formatDate } from '@/shared/utils'
import { generateDropdownSchema } from '@/shared/zod/generators'
import { nameSchema } from '@/shared/zod/schemas'

import { useAccountingTypeDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Account group id
   */
  id: z.string(),
  /**
   * Account group name
   */
  name: nameSchema,
  /**
   * Accounting type
   */
  type: generateDropdownSchema(AccountingType),
  /**
   * Branch id
   */
  branchId: z.string(),
  /**
   * Account group created at
   */
  createdAt: z.string(),
  /**
   * Account group updated at
   */
  updatedAt: z.string(),
})

export type EditAccountGroupFormValues = z.infer<typeof schema>

export const EditAccountGroupForm: React.FC = () => {
  const { t } = useTranslation('accountGroup')
  const {
    query: { id: _id },
  } = useRouter()
  const id = Array.isArray(_id) ? _id.at(0) : _id
  const accountingTypeDropdown = useAccountingTypeDropdown()
  const toast = useToaster()
  const { data: { accountGroup } = {}, loading: queryLoading } =
    useAccountGroupQuery({
      variables: {
        input: {
          id: id ?? '',
        },
      },
      skip: id == null,
    })

  const context = useForm<EditAccountGroupFormValues>({
    schema,
    values: {
      id: accountGroup?.id ?? '',
      name: accountGroup?.name ?? '',
      type: accountGroup?.type ?? null,
      branchId: accountGroup?.branchId ?? '',
      createdAt: formatDate(accountGroup?.createdAt),
      updatedAt: formatDate(accountGroup?.updatedAt),
    },
  })

  const [updateAccountGroup, { loading }] = useUpdateAccountGroupMutation({
    onCompleted: ({ updateAccountGroup }) =>
      toast(() => (
        <Trans
          i18nKey={'accountGroup:editAccountGroup.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: updateAccountGroup.name }}
        />
      )),
    refetchQueries: [
      {
        query: AccountGroupDocument,
        variables: {
          input: { id },
        },
      },
    ],
  })

  const handleSubmit = ({ id, name, type }: EditAccountGroupFormValues) => {
    if (type == null) return null

    void updateAccountGroup({
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
        <div className="gap-y-1">
          <Form.Static<EditAccountGroupFormValues>
            label={t`editAccountGroup.label.id`}
            name="id"
          />
          <Form.Input<EditAccountGroupFormValues>
            label={t`editAccountGroup.label.name`}
            name="name"
          />
          <Form.Dropdown<EditAccountGroupFormValues, AccountingType>
            {...accountingTypeDropdown}
            label={t`editAccountGroup.label.type`}
            name="type"
          />
          <Form.Static<EditAccountGroupFormValues>
            label={t`editAccountGroup.label.branchId`}
            name="branchId"
          />
          <Form.Static<EditAccountGroupFormValues>
            label={t`editAccountGroup.label.createdAt`}
            name="createdAt"
          />
          <Form.Static<EditAccountGroupFormValues>
            label={t`editAccountGroup.label.updatedAt`}
            name="updatedAt"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`editAccountGroup.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
