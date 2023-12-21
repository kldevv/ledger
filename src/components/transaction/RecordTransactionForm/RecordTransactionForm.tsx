import { useTranslation } from "next-i18next"
import { UpsertTransactionForm } from "../UpsertTransactionForm/UpsertTransactionForm"
import { defaultEntryFieldValue } from "../UpsertTransactionForm/UpsertEntryTable/UpsertEntryTable.Row";

const defaultValues = {
  accrualDate: new Date(),
  note: '',
  tagsId: [],
  entries: [defaultEntryFieldValue, defaultEntryFieldValue],
};

export const RecordTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')

  return (
    <UpsertTransactionForm onSubmit={(value) => console.log(value) } onSubmitText={t`RecordTransactionForm.submit`} defaultValues={defaultValues}/>
  );
}