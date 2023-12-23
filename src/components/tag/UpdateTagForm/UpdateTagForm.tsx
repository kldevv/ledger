import { useGetTagQuery } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { FieldValues, UpsertTagForm } from '..';
import { useTranslation } from 'next-i18next';

export const UpdateTagForm: React.FC = () => {
  const { t } = useTranslation('tag');
  const router = useRouter();
  const { id } = router.query;

  const tagId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id;
  }, [id]);

  const { data, loading, error } = useGetTagQuery({
    variables: {
      input: {
        id: tagId ?? '',
      },
    },
    skip: tagId == null,
  });

  const defaultValues: Partial<FieldValues> = useMemo(() => {
    const { name } = data?.getTag ?? {};

    return {
      name,
    };
  }, [data]);

  if (data == null) return null;

  return (
    <UpsertTagForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`UpdateTagForm.submit`}
      defaultValues={defaultValues}
    />
  )
}
