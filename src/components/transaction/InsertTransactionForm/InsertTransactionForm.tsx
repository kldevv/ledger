import { useTranslation } from "next-i18next"
import { FieldValues, UpsertTransactionForm } from ".."
import { defaultEntryFieldValue } from "../UpsertTransactionForm/UpsertEntryTable/UpsertEntryTable.Row";

const defaultValues: FieldValues = {
  accrualDate: new Date(),
  note: '',
  tagIds: [],
  entries: [defaultEntryFieldValue, defaultEntryFieldValue],
};

export const InsertTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')

  return (
    <UpsertTransactionForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`InsertTransactionForm.submit`}
      defaultValues={defaultValues}
    />
  );
}