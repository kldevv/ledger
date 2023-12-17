import { CategoryType, useAddCategoryMutation } from '@/api/graphql';
import { Card, useForm, SubmitButton } from '@/components/common';
import { useFormatter, useVaultContext } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const schema = z.object({
  /**
   * Category name
   */
  name: z.string().min(3).max(50),
  /**
   * Category type
   */
  type: z.nativeEnum(CategoryType),
});

type FieldValues = z.infer<typeof schema>;

export const AddCategoryForm = () => {
  const { t } = useTranslation('category');
  const [{ curVaultId }] = useVaultContext();

  const [Form] = useForm<FieldValues>({
    schema,
  });

  const [addCategory] = useAddCategoryMutation({
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const typeSelectItems = useMemo(
    () =>
      Object.keys(CategoryType).map((value) => ({
        value,
        label: t(`common:enum.categoryType.${value}`),
      })),
    [t]
  );

  const handleOnSubmit = useCallback(
    ({ name, type }: FieldValues) => {
      addCategory({
        variables: {
          input: {
            name,
            type,
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
          <Form.Input
            name="name"
            label={t('add-category-form.label.name')}
            placeholder={t('add-category-form.placeholder.name')}
          />
          <Form.Select
            name="type"
            label={t('add-category-form.label.type')}
            placeholder={t('add-category-form.placeholder.type')}
            items={typeSelectItems}
          />
          <SubmitButton>{t('add-category-form.submit')}</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
