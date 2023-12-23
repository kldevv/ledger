import { useGetCategoriesQuery } from '@/api/graphql';
import {
  Form,
  FormProps,
  InputText,
  ListBox,
  SubmitButton,
} from '@/components/common';
import { UseFormProps, useForm, useVaultContext } from '@/hooks';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { z } from 'zod';

export const schema = z.object({
  /**
   * Account category
   */
  category: z.string(),
  /**
   * Account name
   */
  name: z.string().min(1).max(50),
});

export type FieldValues = z.infer<typeof schema>;

export interface UpsertAccountFormProps {
  /**
   * On submit
   */
  onSubmit: FormProps<FieldValues>['onSubmit'];
  /**
   * On submit text
   */
  onSubmitText: string;
  /**
   * Default form values
   */
  defaultValues: UseFormProps<FieldValues>['defaultValues'];
}

export const UpsertAccountForm: React.FC<UpsertAccountFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('account');

  const context = useForm<FieldValues>({
    schema,
    defaultValues,
  });

  const [{ curVaultId }] = useVaultContext();
  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  const categoryOptions = useMemo(
    () =>
      data?.getCategories.map(({ id, name }) => ({ value: id, label: name })) ??
      [],
    [data]
  );

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<FieldValues>
          name="name"
          label={t('UpsertAccountForm.label.name')}
        />
        <ListBox<FieldValues>
          name="category"
          label={t('UpsertAccountForm.label.currency')}
          options={categoryOptions}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  );
};
