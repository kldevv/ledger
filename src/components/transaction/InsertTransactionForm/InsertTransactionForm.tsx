import { useTranslation } from 'next-i18next';
import { FieldValues, UpsertTransactionForm } from '..';
import {
  EntryStatus,
  useAddTransactionMutation,
  useGetAccountsQuery,
} from '@/api/graphql';
import { useCallback, useMemo } from 'react';
import { useVaultContext } from '@/hooks';

export const InsertTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction');
  const [{ curVaultId }] = useVaultContext();

  const [addTransaction, { loading, error }] = useAddTransactionMutation({
    onCompleted: (data) => console.log(data),
  });

  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        vaultId: curVaultId,
      },
    },
    skip: curVaultId == null,
  });

  const values = useMemo(() => {
    if (data?.getAccounts == null) {
      return undefined;
    }

    const entry = {
      transactionDate: new Date(),
      accountId: data.getAccounts[0]?.id,
      memo: '',
      status: EntryStatus.PENDING,
      debit: 0,
      credit: 0,
    };

    return {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [{ ...entry }, { ...entry }],
    };
  }, [data?.getAccounts]);

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      console.log(values);
      if (curVaultId == null) {
        return;
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
      values={values}
    />
  );
};
