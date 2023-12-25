import { useTranslation } from "next-i18next"
import { FieldValues, UpsertTransactionForm } from ".."
import { useAddTransactionMutation } from "@/api/graphql";
import { useCallback } from "react";
import { UseFormProps, useVaultContext } from "@/hooks";

const defaultValues: UseFormProps<FieldValues>['defaultValues'] = {
  accrualDate: new Date(),
  note: '',
  tagIds: [],
  entries: [],
};

export const InsertTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')
  const [{ curVaultId }] = useVaultContext()

    const [ addTransaction, { loading, error } ] = useAddTransactionMutation({
      onCompleted: (data) => console.log(data)
    });

    const handleOnSubmit = useCallback(
      (values: FieldValues) => {
        console.log(values);
        if (curVaultId == null) {
          return
        }

        void addTransaction({
          variables: {
            input: {
              ...values,
              vaultId: curVaultId,
            },
          },
        });
      },
      [addTransaction]
    );

  return (
    <UpsertTransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`InsertTransactionForm.submit`}
      defaultValues={defaultValues}
    />
  );
}