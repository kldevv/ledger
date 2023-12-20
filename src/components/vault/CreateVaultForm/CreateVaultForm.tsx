import { useAddVaultMutation, useGetCurrencyMetaQuery } from '@/api/graphql';
import { Card, Form, Input, ListBox, SubmitButton } from '@/components/common';
import { useForm } from '@/hooks';
import { Currency } from '@prisma/client';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
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
})

type FieldValues = z.infer<typeof schema>;

export const CreateVaultForm = () => {
  const { data: { getCurrencyMeta } = {}, loading, error } = useGetCurrencyMetaQuery()
  const [ addVault ] = useAddVaultMutation({
    onCompleted: (data) => {console.log(data)}
  })
  const { t } = useTranslation('vault')

  const formContext = useForm<FieldValues>({
    schema,
    defaultValues: {
      name: '',
      currency: 'USD'
    }
  });

  const handleOnSubmit = useCallback((value: FieldValues) => {
    addVault({
      variables: {
        input: {
          ...value,
          ownerId: '000'
        }
      }
    })
  }, []);

  return (
    <Card variant="2xl">
      <Form onSubmit={handleOnSubmit} formContext={formContext} className='w-fit'>
        <div className="flex flex-col">
          <Input
            name="name"
            label={t('create-vault-form.label.name')}
            placeholder={t('create-vault-form.placeholder.name')}
          />
          <ListBox
            name="currency"
            label={t('create-vault-form.label.currency')}
            options={getCurrencyMeta ?? []}
          />
          <SubmitButton>{t('create-vault-form.submit')}</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
