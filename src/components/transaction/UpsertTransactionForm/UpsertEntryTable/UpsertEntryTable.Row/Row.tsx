import { Button, DatePicker, InputText, InputNumber, ListBox, StatusChip } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { FieldValues } from '../..';
import { useCallback } from 'react';
import { EntryStatus } from '@prisma/client';
import { useAccountsContext } from '@/hooks';

export const defaultEntryFieldValue: FieldValues['entries'][number] = {
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
  const { result: { data, loading, error } } = useAccountsContext()

  const handleOnAppend = useCallback(() => {
    void append?.(
      {
        ...defaultEntryFieldValue,
        accountId: data?.getAccounts[0].id ?? '',
      },
      {
        shouldFocus: false,
      }
    );
  }, [append, data]);

  const handleRemove = useCallback(() => {
    void remove?.(index);
  }, [remove, index]);

 
  return (
    <div className="flex gap-x-1 items-start">
      <div className="grid grid-cols-3 w-max gap-x-1 max-w-5xl">
        <DatePicker<FieldValues>
          label={t`UpsertTransactionForm.label.entries.transactionDate`}
          name={`entries.${index}.transactionDate` as const}
        />
        <InputText<FieldValues>
          label={t('UpsertTransactionForm.label.entries.memo')}
          name={`entries.${index}.memo` as const}
        />
        <ListBox<FieldValues>
          label={t('UpsertTransactionForm.label.entries.status')}
          name={`entries.${index}.status` as const}
          options={Object.keys(EntryStatus).map((value) => ({
            value,
            label: <StatusChip status={value} key={value} />,
          }))}
        />
        <InputNumber<FieldValues>
          label={t('UpsertTransactionForm.label.entries.debit')}
          name={`entries.${index}.debit` as const}
        />
        <InputNumber<FieldValues>
          label={t('UpsertTransactionForm.label.entries.credit')}
          name={`entries.${index}.credit` as const}
        />
        <ListBox<FieldValues>
          label={t('UpsertTransactionForm.label.entries.account')}
          name={`entries.${index}.accountId` as const}
          loading={loading}
          options={
            data?.getAccounts.map(({ id, name }) => ({
              value: id,
              label: name,
            })) ?? []
          }
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
