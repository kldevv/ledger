import { useTranslation } from "next-i18next"
import { UpsertTransactionForm } from "../UpsertTransactionForm/UpsertTransactionForm"

const defaultValues = {
  accrualDate: new Date(Date.now()),
  note: '',
  tagsId: []
}

export const RecordTransaction: React.FC = () => {
  const { t } = useTranslation('transaction')

  return (
    <UpsertTransactionForm onSubmit={(value) => console.log(value) } onSubmitText={t`RecordTransaction.submit`} defaultValues={defaultValues}/>
  );
}