import { Trans, useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { z } from 'zod'

import {
  AccountGroupsDocument,
  AccountingType,
  useAddAccountGroupMutation,
} from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useCurrentBranch, useForm } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { useToaster } from '@/hooks'
import { generateDropdownSchema } from '@/shared/zod/schemas/generators'
import { nameSchema } from '@/shared/zod/schemas'

import { useAccountingTypeDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Account group name
   */
  name: nameSchema,
  /**
   * Branch id
   */
  branchId: z.string(),
  /**
   * Accounting type
   */
  type: generateDropdownSchema(AccountingType),
})

export type AddAccountGroupFormValues = z.infer<typeof schema>

export const AddAccountGroupForm: React.FC = () => {
  const { t } = useTranslation('accountGroup')
  const toast = useToaster()
  const [currentBranch] = useCurrentBranch()
  const accountingTypeDropdown = useAccountingTypeDropdown()
  const { setValue, ...context } = useForm<AddAccountGroupFormValues>({
    schema,
    defaultValues: {
      name: '',
      type: null,
      branchId: '',
    },
  })

  const [addAccountGroup, { loading }] = useAddAccountGroupMutation({
    onCompleted: ({ addAccountGroup }) =>
      toast(() => (
        <Trans
          i18nKey={'accountGroup:addAccountGroup.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: addAccountGroup.name }}
        />
      )),
    refetchQueries: [
      {
        query: AccountGroupsDocument,
        variables: {
          input: { branchId: currentBranch?.id },
        },
      },
    ],
  })

  const handleSubmit = ({ type, ...rest }: AddAccountGroupFormValues) => {
    void addAccountGroup({
      variables: {
        input: {
          ...rest,
          type: type ?? AccountingType.ASSETS,
        },
      },
    })
  }

  useEffect(() => {
    if (currentBranch) {
      setValue('branchId', currentBranch?.id)
    }
  }, [setValue, currentBranch, context.formState.isSubmitSuccessful])

  return (
    <Form
      context={{ setValue, ...context }}
      onSubmit={handleSubmit}
      className="w-fit"
    >
      <Card className="w-80">
        <div className="gap-y-1">
          <Form.Input<AddAccountGroupFormValues>
            label={t`addAccountGroup.label.name`}
            name="name"
            placeholder={t`addAccountGroup.placeholder.name`}
          />
          <Form.Dropdown<AddAccountGroupFormValues, AccountingType>
            {...accountingTypeDropdown}
            label={t`addAccountGroup.label.type`}
            name="type"
            placeholder={t`addAccountGroup.placeholder.type`}
          />
          <Form.Static<AddAccountGroupFormValues>
            label={t`addAccountGroup.label.branchId`}
            name="branchId"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addAccountGroup.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
