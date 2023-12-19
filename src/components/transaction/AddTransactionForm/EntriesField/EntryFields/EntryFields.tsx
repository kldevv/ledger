import { useFormInput } from '@/components/common';
import { AddTransactionFormFieldValues } from '@/components/transaction';
import { useTranslation } from 'react-i18next';
import { AccountSelect } from './AccountSelect';
import { useFormDateInput } from '@/components/common/Form/useFormDateInput';

export interface EntryFieldsProps {
  /**
   * Index of the entry fields
   */
  index: number;
}

export const EntryFields: React.FC<EntryFieldsProps> = ({ index }) => {
  const { t } = useTranslation('transaction');
  const Input = useFormInput<AddTransactionFormFieldValues>();
  const DateInput = useFormDateInput<AddTransactionFormFieldValues>();

  return (
    <div className="flex gap-x-1">
      <DateInput
        label={t('add-transaction-form.label.entries.transaction-date')}
        name={`entries.${index}.transactionDate`}
      />
      <Input
        label={t('add-transaction-form.label.entries.debit')}
        type="number"
        name={`entries.${index}.debit`}
      />
      <Input
        label={t('add-transaction-form.label.entries.credit')}
        type="number"
        name={`entries.${index}.credit`}
      />
      <AccountSelect index={index} />
      <Input
        label={t('add-transaction-form.label.entries.memo')}
        name={`entries.${index}.memo`}
      />
    </div>
  );
};
