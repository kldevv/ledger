import { Currency, useAddVaultMutation, useGetCurrencyMetaQuery } from '@/api/graphql';
import { Card, useForm, SubmitButton } from '@/components/common';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const schema = z.object({
  /**
   * Vault name
   */
  name: z.string().min(3).max(50),
  /**
   * Vault currency
   */
  currency: z.nativeEnum(Currency),
});

type FieldValues = z.infer<typeof schema>;

export const CreateVaultForm = () => {
  const {
    data: { getCurrencyMeta } = {},
    loading,
    error,
  } = useGetCurrencyMetaQuery();
  const [addVault] = useAddVaultMutation({
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const { t } = useTranslation('vault');

  const [Form] = useForm<FieldValues>({
    schema,
  });

  const handleOnSubmit = useCallback((value: FieldValues) => {
    addVault({
      variables: {
        input: {
          ...value,
          ownerId: '000',
        },
      },
    });
  }, []);

  return (
    <Card variant="sm">
      <Form onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <Form.Input
            name="name"
            label={t('create-vault-form.label.name')}
            placeholder={t('create-vault-form.placeholder.name')}
          />
          <Form.Select
            name="currency"
            label={t('create-vault-form.label.currency')}
            placeholder={t('create-vault-form.placeholder.currency')}
            items={getCurrencyMeta ?? []}
          />
          <SubmitButton>{t('create-vault-form.submit')}</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
