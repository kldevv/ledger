import { useGetAccountQuery, useUpdateAccountMutation } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { FieldValues, UpsertAccountForm } from '..';
import { useTranslation } from 'next-i18next';

export const UpdateAccountForm: React.FC = () => {
  const { t } = useTranslation('account');
  const router = useRouter();
  const { id } = router.query;

  const accountId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id;
  }, [id]);

  const { data, loading, error } = useGetAccountQuery({
    variables: {
      input: {
        id: accountId ?? '',
      },
    },
    skip: accountId == null,
  });

  const [updateAccount] = useUpdateAccountMutation();

  const values = useMemo(() => {
    if (data?.getAccount == null) {
      return undefined;
    }

    return {
      name: data.getAccount.name,
      categoryId: data.getAccount.category.id,
    };
  }, [data?.getAccount]);

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      if (data?.getAccount == null) {
        return;
      }

      updateAccount({
        variables: {
          input: {
            id: data.getAccount.id,
            ...values,
          },
        },
      });
    },
    [updateAccount, data?.getAccount]
  );

  return (
    <UpsertAccountForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateAccountForm.submit`}
      values={values}
    />
  );
};
