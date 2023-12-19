import { useFormInput } from '@/components/common';
import { useTranslation } from 'react-i18next';

export interface EntryFieldsProps {
  /**
   * Index of the entry fields
   */
  index: number;
}

export const EntryFields: React.FC<EntryFieldsProps> = ({ index }) => {
  const { t } = useTranslation('transaction');
  const Input = useFormInput();

  return (
    <div className="flex gap-x-1">
      <Input
        label={t('add-transaction-form.label.entries.transaction-date')}
        type="date"
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
      <Input
        label={t('add-transaction-form.label.entries.memo')}
        name={`entries.${index}.memo`}
      />
      <Input
        label={t('add-transaction-form.label.entries.memo')}
        name={`entries.${index}.memo`}
      />
    </div>
  );
};
