import { useGetTransactionDetailQuery } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { UpsertTransactionForm} from '..';
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
    fetchPolicy: 'network-only',
    skip: transactionId == null,
  });

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

  return (
    <UpsertTransactionForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`UpdateTransactionForm.submit`}
      values={values}
    />
  );
};
