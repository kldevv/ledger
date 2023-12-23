import { useAddAccountMutation } from '@/api/graphql';
import { FieldValues, UpsertAccountForm } from '..';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { useVaultContext } from '@/hooks';

const defaultValues: FieldValues = {
  name: '',
  categoryId: '',
};

export const InsertAccountFrom: React.FC = () => {
  const { t } = useTranslation('account');
  const [{ curVaultId }] = useVaultContext()

  const [addAccount] = useAddAccountMutation({
    onCompleted: (data) => console.log(data),
  });

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      if (curVaultId == null) {
        return;
      }

      addAccount({
        variables: {
          input: {
            ...values,
            vaultId: curVaultId,
          },
        },
      });
    },
    [curVaultId, addAccount]
  );

  return (
    <UpsertAccountForm
      onSubmitText={t`InsertAccountFrom.submit`}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  );
};
