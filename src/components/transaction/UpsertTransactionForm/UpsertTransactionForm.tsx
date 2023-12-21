import { Card, Form, Input, DatePicker, SubmitButton, FormProps } from '@/components/common';
import { UseFormProps, useForm } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

const schema = z.object({
  /**
   * Transaction accrual date
   */
  accrualDate: z.coerce.date(),
  /**
   * Transaction note
   */
  note: z.string().min(1),
  /**
   * Transaction tags
   */
  tagIds: z.string().array().optional(),
  // /**
  //  * Transaction entries
  //  */
  // entries: entrySchema.array().nonempty(),
});

type FieldValues = z.infer<typeof schema>;

export interface UpsertTransactionFormProps {
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

export const UpsertTransactionForm: React.FC<UpsertTransactionFormProps> = ({
  onSubmit,
  onSubmitText,
  defaultValues,
}) => {
  const { t } = useTranslation('transaction');

  const context = useForm<FieldValues>({
    schema,
    defaultValues,
  });

  return (
    <Card variant="2xl">
      <Form onSubmit={onSubmit} context={context}>
        <Input<FieldValues>
          label={t('UpsertTransactionForm.label.note')}
          name="note"
        />
        <DatePicker<FieldValues>
          label={t('UpsertTransactionForm.label.accrualDate')}
          name="accrualDate"
        />
        <SubmitButton>{onSubmitText}</SubmitButton>
      </Form>
    </Card>
  );
};
