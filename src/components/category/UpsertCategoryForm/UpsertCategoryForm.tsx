import { CategoryType } from '@/api/graphql';
import {
  Form,
  FormProps,
  InputText,
  ListBox,
  SubmitButton,
} from '@/components/common';
import { UseFormProps, useForm } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { z } from 'zod';

const schema = z.object({
  /**
   * Category name
   */
  name: z.string().min(1).max(50),
  /**
   * Category type
   */
  type: z.nativeEnum(CategoryType),
});

export type FieldValues = z.infer<typeof schema>;

export interface UpsertCategoryFormProps {
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

export const UpsertCategoryForm: React.FC<UpsertCategoryFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('category');

  const context = useForm<FieldValues>({
    schema,
    defaultValues,
  });

  const typeOptions = useMemo(
    () => Object.values(CategoryType).map((value) => ({ value, label: value })),
    []
  );

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<FieldValues>
          name="name"
          label={t('UpsertCategoryForm.label.name')}
        />
        <ListBox<FieldValues>
          name="type"
          label={t('UpsertCategoryForm.label.type')}
          options={typeOptions}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  );
};
