import {
  Form,
  FormProps,
  InputText,
  SubmitButton,
} from '@/components/common';
import { UseFormProps, useForm } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

const schema = z.object({
  /**
   * Tag name
   */
  name: z.string().min(1).max(50),
});

export type FieldValues = z.infer<typeof schema>;

export interface UpsertTagFormProps {
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

export const UpsertTagForm: React.FC<UpsertTagFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('tag');

  const context = useForm<FieldValues>({
    schema,
    defaultValues,
  });

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <InputText<FieldValues>
          name="name"
          label={t('UpsertTagForm.label.name')}
        />
      </div>
      <SubmitButton className="mt-4">{onSubmitText}</SubmitButton>
    </Form>
  );
};
