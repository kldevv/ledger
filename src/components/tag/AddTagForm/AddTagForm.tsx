import { useAddTagMutation } from '@/api/graphql';
import { Card, useForm, SubmitButton } from '@/components/common';
import { useVaultContext } from '@/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const schema = z.object({
  /**
   * Tag name
   */
  name: z.string().min(3).max(50),
});

type FieldValues = z.infer<typeof schema>;

export const AddTagForm = () => {
  const { t } = useTranslation('tag');
  const [{ curVaultId }] = useVaultContext();

  const [Form] = useForm<FieldValues>({
    schema,
  });

  const [addTag] = useAddTagMutation({
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleOnSubmit = useCallback(
    ({ name }: FieldValues) => {
      addTag({
        variables: {
          input: {
            name,
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
            label={t('add-tag-form.label.name')}
            placeholder={t('add-tag-form.placeholder.name')}
          />
          <SubmitButton>{t('add-tag-form.submit')}</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
