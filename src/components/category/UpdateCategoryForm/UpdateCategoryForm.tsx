import { useGetAccountQuery, useGetCategoryQuery } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { FieldValues, UpsertCategoryForm } from '..';
import { useTranslation } from 'next-i18next';

export const UpdateCategoryForm: React.FC = () => {
  const { t } = useTranslation('category');
  const router = useRouter();
  const { id } = router.query;

  const categoryId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id;
  }, [id]);

  const { data, loading, error } = useGetCategoryQuery({
    variables: {
      input: {
        id: categoryId ?? '',
      },
    },
    skip: categoryId == null,
  });

  const defaultValues: Partial<FieldValues> = useMemo(() => {
    const { name, type } = data?.getCategory ?? {};

    return {
      name,
      type,
    };
  }, [data]);

  if (data == null) return null;

  return (
    <UpsertCategoryForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`UpdateCategoryForm.submit`}
      defaultValues={defaultValues}
    />
  );
};
