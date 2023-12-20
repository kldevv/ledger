import { Button, DatePicker, Input, ListBox } from '@/components/common';
import { useTranslation } from 'react-i18next';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

export interface EntryFieldsProps {
  /**
   * Index of the entry fields
   */
  index: number;
}

export const EntryFields: React.FC<EntryFieldsProps> = ({ index }) => {
  const { t } = useTranslation('transaction')

  return (
    <div className="flex gap-x-1 items-start">
      <div className="grid grid-cols-6 w-max gap-x-1 max-w-5xl">
        <DatePicker
          label={t('add-transaction-form.label.entries.transaction-date')}
          name={`entries.${index}.transactionDate` as const}
        />
        <Input
          label={t('add-transaction-form.label.entries.debit')}
          type="number"
          name={`entries.${index}.debit` as const}
        />
        <Input
          label={t('add-transaction-form.label.entries.credit')}
          type="number"
          name={`entries.${index}.credit` as const}
        />
        <ListBox
          label={t('add-transaction-form.label.entries.account')}
          name={`entries.${index}.accountId` as const}
          options={[]}
        />
        <Input
          label={t('add-transaction-form.label.entries.memo')}
          name={`entries.${index}.memo` as const}
        />
        <Input
          label={t('add-transaction-form.label.entries.status')}
          name={`entries.${index}.status` as const}
        />
      </div>
      <div className="mt-10 flex gap-x-1">
        <Button>
          <PlusCircleIcon className="w-5 h-5 text-light-accent" />
        </Button>
        <Button>
          <MinusCircleIcon className="w-5 h-5 text-light-accent" />
        </Button>
      </div>
    </div>
  );
};
