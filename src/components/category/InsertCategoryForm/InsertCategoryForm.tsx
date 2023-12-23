import { CategoryType, useAddAccountMutation, useAddCategoryMutation } from '@/api/graphql';
import { FieldValues, UpsertCategoryForm } from '..';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { useVaultContext } from '@/hooks';

const defaultValues: FieldValues = {
  name: '',
  type: CategoryType.ASSETS
};

export const InsertCategoryFrom: React.FC = () => {
  const { t } = useTranslation('category');
  const [{ curVaultId }] = useVaultContext();

  const [addCategory] = useAddCategoryMutation({
    onCompleted: (data) => console.log(data),
  });

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      if (curVaultId == null) {
        return;
      }

      addCategory({
        variables: {
          input: {
            ...values,
            vaultId: curVaultId,
          },
        },
      });
    },
    [curVaultId, addCategory]
  );

  return (
    <UpsertCategoryForm
      onSubmitText={t`InsertCategoryFrom.submit`}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};
