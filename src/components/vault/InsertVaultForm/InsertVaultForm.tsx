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
            ownerId: '000'
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