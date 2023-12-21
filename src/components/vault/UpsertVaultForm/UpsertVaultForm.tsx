import { Currency } from '@/api/graphql';
import {
  Card,
  Form,
  FormProps,
  Input,
  ListBox,
  SubmitButton,
} from '@/components/common';
import { UseFormProps, useForm } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

export const schema = z.object({
  /**
   * Vault name
   */
  name: z.string().min(1).max(50),
  /**
   * Vault currency
   */
  currency: z.nativeEnum(Currency),
});

export type FieldValues = z.infer<typeof schema>;

export interface UpsertVaultFormProps {
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

export const UpsertVaultForm: React.FC<UpsertVaultFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('vault');

  const context = useForm<FieldValues>({
    schema,
    defaultValues,
  });

  return (
    <Form onSubmit={onSubmit} context={context}>
      <div className="flex flex-col">
        <Input<FieldValues>
          name="name"
          label={t('UpsertVaultForm.label.name')}
        />
        <ListBox<FieldValues>
          name="currency"
          label={t('UpsertVaultForm.label.currency')}
          options={currencyOptions}
        />
      </div>
      <SubmitButton className='mt-4'>{onSubmitText}</SubmitButton>
    </Form>
  );
};

const currencyOptions = Object.keys(Currency).map((value) => ({
  value,
  label: value,
}));
