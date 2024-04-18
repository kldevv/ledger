import { Trans, useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { z } from 'zod'

import { AccountsDocument, useAddAccountMutation } from '@/api/graphql'
import { Form } from '@/components/core/containers'
import { useCurrentBranch, useForm, useToaster } from '@/components/core/hooks'
import { Card } from '@/components/core/presentationals'
import { nameSchema } from '@/shared/zod/schemas'

import { useAccountGroupDropdown } from '../../hooks'

const schema = z.object({
  /**
   * Account name
   */
  name: nameSchema,
  /**
   * Branch id
   */
  branchId: z.string(),
  /**
   * Account group id
   */
  accountGroupId: z.string().refine((arg) => arg.length > 0),
})

export type AddAccountFormValues = z.infer<typeof schema>

export const AddAccountForm: React.FC = () => {
  const { t } = useTranslation('account')
  const toast = useToaster()
  const [currentBranch] = useCurrentBranch()
  const accountGroupDropdown = useAccountGroupDropdown()
  const { setValue, ...context } = useForm<AddAccountFormValues>({
    schema,
    defaultValues: {
      name: '',
      branchId: '',
      accountGroupId: '',
    },
  })

  const [addAccount, { loading }] = useAddAccountMutation({
    onCompleted: ({ addAccount }) =>
      toast(() => (
        <Trans
          i18nKey={'account:addAccount.toast'}
          components={{
            b: <b />,
          }}
          values={{ name: addAccount.name }}
        />
      )),
    refetchQueries: [
      {
        query: AccountsDocument,
        variables: {
          input: { branchId: currentBranch?.id },
        },
      },
    ],
  })

  const handleSubmit = (values: AddAccountFormValues) => {
    void addAccount({
      variables: {
        input: values,
      },
    })
  }

  useEffect(() => {
    if (currentBranch) {
      setValue('branchId', currentBranch?.id)
      setValue('accountGroupId', '')
    }
  }, [setValue, currentBranch, context.formState.isSubmitSuccessful])

  return (
    <Form
      context={{ setValue, ...context }}
      onSubmit={handleSubmit}
      className="w-fit"
    >
      <Card className="w-80">
        <div className="flex flex-col gap-y-2">
          <Form.Input<AddAccountFormValues>
            label={t`addAccount.label.name`}
            name="name"
            placeholder={t`addAccount.placeholder.name`}
          />
          <Form.Dropdown<AddAccountFormValues, string>
            {...accountGroupDropdown}
            label={t`addAccount.label.accountGroupId`}
            name="accountGroupId"
            placeholder={t`addAccount.placeholder.accountGroupId`}
          />
          <Form.Static<AddAccountFormValues>
            label={t`addAccount.label.branchId`}
            name="branchId"
          />
        </div>
        <Form.Submit
          className="mt-8 w-full"
          loading={loading}
        >{t`addAccount.submit`}</Form.Submit>
      </Card>
    </Form>
  )
}
