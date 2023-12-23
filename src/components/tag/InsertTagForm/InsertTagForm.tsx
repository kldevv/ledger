import { useAddTagMutation } from '@/api/graphql';
import { FieldValues, UpsertTagForm } from '..';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { useVaultContext } from '@/hooks';

const defaultValues: FieldValues = {
  name: '',
};

export const InsertTagForm: React.FC = () => {
  const { t } = useTranslation('tag');
  const [{ curVaultId }] = useVaultContext();

  const [addTag] = useAddTagMutation({
    onCompleted: (data) => console.log(data),
  });

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      if (curVaultId == null) {
        return;
      }

      addTag({
        variables: {
          input: {
            ...values,
            vaultId: curVaultId,
          },
        },
      });
    },
    [curVaultId, addTag]
  );

  return (
    <UpsertTagForm
      onSubmitText={t`InsertTagForm.submit`}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};
