import {
  useGetTransactionDetailQuery,
  useUpdateTransactionMutation,
} from '@/api/graphql';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { FieldValues, UpsertTransactionForm } from '..';
import { useTranslation } from 'next-i18next';

export const UpdateTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction');
  const router = useRouter();
  const { id } = router.query;

  const transactionId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id;
  }, [id]);

  const { data, loading, error } = useGetTransactionDetailQuery({
    variables: {
      getTransactionInput: {
        id: transactionId ?? '',
      },
      getEntriesInput: {
        transactionId,
      },
    },
    skip: transactionId == null,
  });

  const [updateTransaction] = useUpdateTransactionMutation();

  const values = useMemo(() => {
    if (data?.getTransaction == null || data?.getEntries == null) {
      return undefined;
    }

    const { accrualDate, note, tags } = data.getTransaction;
    const entries = data.getEntries.map(
      ({
        transactionDate,
        debit,
        credit,
        memo,
        status,
        account: { id: accountId },
      }) => ({
        transactionDate,
        debit,
        credit,
        accountId,
        memo,
        status,
      })
    );
    const tagIds = tags?.map(({ id }) => id) ?? [];

    return {
      accrualDate,
      note,
      tagIds,
      entries,
    };
  }, [data]);

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      if (data?.getTransaction == null) {
        return null;
      }

      void updateTransaction({
        variables: {
          input: {
            id: data?.getTransaction?.id,
            vaultId: data?.getTransaction.vaultId,
            ...values,
          },
        },
      });
    },
    [data?.getTransaction, updateTransaction]
  );

  return (
    <UpsertTransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateTransactionForm.submit`}
      values={values}
    />
  );
};
