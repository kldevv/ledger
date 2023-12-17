import { useAddAccountMutation, useGetCategoriesQuery } from '@/api/graphql';
import { Card, useForm, SubmitButton } from '@/components/common';
import { useVaultContext } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const schema = z.object({
  /**
   * Account category
   */
  category: z.string(),
  /**
   * Account name
   */
  name: z.string().min(3).max(50),
});

type FieldValues = z.infer<typeof schema>;

export const AddAccountForm = () => {
  const { t } = useTranslation('account');
  const [Form, { watch }] = useForm<FieldValues>({
    schema,
  });
  
  const [{ curVaultId }] = useVaultContext()

  const {
    data: { getCategories } = {},
  } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  const categorySelectItems = useMemo(
    () =>
      getCategories?.map(({ id, name }) => ({
        value: id,
        label: name,
      })) ?? [],
    [getCategories]
  );

  const selectedCategoryId = watch('category');

  const categoryType = useMemo(() => {
    return getCategories?.find(({ id }) => id === selectedCategoryId)?.type;
  }, [selectedCategoryId, getCategories]);

  const [addAccount] = useAddAccountMutation({
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleOnSubmit = useCallback(
    ({ name, category }: FieldValues) => {
      addAccount({
        variables: {
          input: {
            name,
            categoryId: category,
            vaultId: curVaultId ?? '',
          },
        },
      });
    },
    [curVaultId]
  );

  return (
    <Card variant="sm">
      <Form onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <Form.Select
            name="category"
            label={t('add-account-form.label.category')}
            placeholder={t('add-account-form.placeholder.category')}
            items={categorySelectItems}
          />
          {categoryType && (
            <div className="text-xs text-gray">{categoryType}</div>
          )}
          <Form.Input
            name="name"
            label={t('add-account-form.label.name')}
            placeholder={t('add-account-form.placeholder.name')}
          />
          <SubmitButton>{t('add-account-form.submit')}</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
