import { useTranslation } from "next-i18next"
import { FieldValues, UpsertTransactionForm } from ".."
import { defaultEntryFieldValue } from "../UpsertTransactionForm/UpsertEntryTable/UpsertEntryTable.Row";
import { useAddTransactionMutation } from "@/api/graphql";
import { useCallback } from "react";
import { useVaultContext } from "@/hooks";

const defaultValues: FieldValues = {
  accrualDate: new Date(),
  note: '',
  tagIds: [],
  entries: [defaultEntryFieldValue, defaultEntryFieldValue],
};

export const InsertTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')
  const [{ curVaultId }] = useVaultContext()

    const [addTransaction, { loading, error }] = useAddTransactionMutation({
      onCompleted: (data) => console.log(data)
    });

    console.log(error)

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