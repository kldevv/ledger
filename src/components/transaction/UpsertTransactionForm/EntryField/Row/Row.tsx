import { Button, DatePicker, Input, ListBox } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { MinusIcon, PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { DefaultValues, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { FieldValues } from '../..';
import { useCallback } from 'react';
import { EntryStatus } from '@prisma/client';

export const defaultEntryFieldValue: Required<Exclude<
  DefaultValues<FieldValues>['entries'],
  undefined
>[number]> = {
  transactionDate: new Date(),
  accountId: '',
  memo: '',
  status: EntryStatus.PENDING,
  debit: 0,
  credit: 0,
};

export interface RowProps {
  /**
   * Row index
   */
  index: number;
  /**
   * Field append
   */
  append?: UseFieldArrayAppend<FieldValues> | null;
  /**
   * Field remove
   */
  remove?: UseFieldArrayRemove | null;
}

export const Row: React.FC<RowProps> = ({
  index,
  append,
  remove,
}) => {
  const { t } = useTranslation('transaction');

  const handleOnAppend = useCallback(() => {
    void append?.(defaultEntryFieldValue);
  }, [append])

  const handleRemove = useCallback(() => {
    void remove?.(index);
  }, [remove, index]);
 
  return (
    <div className="flex gap-x-1 items-start">
      <div className="grid grid-cols-3 w-max gap-x-1 max-w-5xl">
        <DatePicker
          label={t`add-transaction-form.label.entries.transaction-date`}
          name={`entries.${index}.transactionDate` as const}
        />
        <Input
          label={t('add-transaction-form.label.entries.memo')}
          name={`entries.${index}.memo` as const}
        />
        <Input
          label={t('add-transaction-form.label.entries.status')}
          name={`entries.${index}.status` as const}
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
      </div>
      <div className="mt-20 flex gap-x-1 w-10 relative">
        {remove && (
          <Button onClick={handleRemove} className="absolute left-1">
            <div className="rounded border border-light-accent">
              <TrashIcon className="w-3 h-3 text-light-accent" />
            </div>
          </Button>
        )}
        {append && (
          <Button onClick={handleOnAppend} className="absolute right-1">
            <div className="rounded border border-light-accent bg-light-accent">
              <PlusIcon className="w-3 h-3 text-light-shades" />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};
