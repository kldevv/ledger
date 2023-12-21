import { useGetTransactionDetailQuery } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { UpsertTransactionForm } from '..';
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

  const defaultValues = useMemo(() => {
    const { accrualDate, note, tags } = data?.getTransaction ?? {};
    const entries = data?.getEntries.map(
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
        memo: memo ?? undefined,
        status,
      }) ?? []
    );
    const tagsId = tags?.map(({ id }) => id) ?? []

    return {
      accrualDate,
      note,
      tagsId,
      entries,
    };
  }, [data]);

  if (data == null) return null;

  return (
    <UpsertTransactionForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`UpdateTransactionForm.submit`}
      defaultValues={defaultValues}
    />
  );
};
