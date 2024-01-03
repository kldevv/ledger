import { Currency, useAddVaultMutation } from "@/api/graphql"
import { FieldValues, UpsertVaultForm } from ".."
import { useCallback } from "react"
import { useTranslation } from "next-i18next"

const defaultValues = {
  name: '',
  currency: Currency.USD
}

export const InsertVaultForm: React.FC = () => {
  const { t } = useTranslation('vault')

  const [ addVault ] = useAddVaultMutation({
    onCompleted: (data) => console.log(data)
  })

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      addVault({
        variables: {
          input: {
            ...values,
            ownerId:
              process.env.PROFILE_ID ?? 'ce4a7c81-6404-4098-a763-64550c4ec902',
          },
        },
      });
    },
    [addVault]
  );

  return (
    <UpsertVaultForm
      onSubmitText={t`InsertVaultForm.submit`}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
}