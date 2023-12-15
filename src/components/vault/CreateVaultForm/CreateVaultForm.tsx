import { Card, useForm, SubmitButton } from '@/components/common';
import { useCallback } from 'react';
import { z } from 'zod';

const schema = z.object({
  /**
   * Vault name
   */
  name: z.string().min(3).max(50),
  /**
   * Vault currency
   */
  currency: z.enum(['NTD', 'USD'] as const),
});

type FieldValues = z.infer<typeof schema>;

export const CreateVaultForm = () => {
  const [Form] = useForm<FieldValues>({
    schema,
  });

  const handleOnSubmit = useCallback((value: FieldValues) => {
    console.log(value);
  }, []);

  return (
    <Card variant="sm">
      <Form onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <Form.Input name="name" label="Name" placeholder="Vault name..." />
          <Form.Select
            name="currency"
            label="Currency"
            items={[
              {
                value: 'USD',
                label: 'USD',
              },
              {
                value: 'NTD',
                label: 'NTD',
              },
              {
                value: 'EUR',
                label: 'EUR',
              },
              {
                value: 'A',
                label: 'A',
              },
              {
                value: 'B',
                label: 'B',
              },
              {
                value: 'C',
                label: 'C',
              },
              {
                value: 'D',
                label: '',
              },
            ]}
          />
          <SubmitButton>CREATE</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
