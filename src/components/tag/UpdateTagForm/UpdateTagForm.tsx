import { useGetTagQuery, useUpdateTagMutation } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
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

  const [updateTag] = useUpdateTagMutation();

  const values = useMemo(() => {
    if (data?.getTag == null) {
      return undefined;
    }

    return {
      name: data.getTag.name,
    };
  }, [data?.getTag]);

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      if (data?.getTag == null) {
        return;
      }

      updateTag({
        variables: {
          input: {
            id: data.getTag.id,
            ...values
          }
        }
      })
    },
    [data?.getTag, updateTag]
  );

  return (
    <UpsertTagForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateTagForm.submit`}
      values={values}
    />
  );
};
