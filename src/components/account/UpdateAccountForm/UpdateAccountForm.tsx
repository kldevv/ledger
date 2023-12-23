import { useGetAccountQuery } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
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

  const defaultValues: Partial<FieldValues> = useMemo(() => {
    const { name, category } = data?.getAccount ?? {};

    return {
      name,
      categoryId: category?.id,
    };
  }, [data]);

  if (data == null) return null;

  return (
    <UpsertAccountForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`UpdateAccountForm.submit`}
      defaultValues={defaultValues}
    />
  );
};
