import { Card, useForm, SubmitButton, createFormInput } from '@/components/common';
import { ErrorMessage } from '@hookform/error-message';
import { useCallback } from "react"
import { z } from "zod"

const schema = z.object({
  /**
   * Vault name
   */
  name: z.string().min(3).max(50),
  /**
   * Vault currency
   */
  currency: z.enum(['NTD', 'USD'] as const)
})

type FieldValues = z.infer<typeof schema>

export const CreateVaultForm = () => {
  const [ Form ] = useForm<FieldValues>({
    schema,
  });

  const handleOnSubmit = useCallback((value: FieldValues) => {
    console.log(value);
  }, []);

  return (
    <Card variant="sm">
      <Form onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <Form.Input name="name" label="Name" />
          <Form.Input name="currency" label="Currency" />
          <SubmitButton>CREATE</SubmitButton>
        </div>
      </Form>
    </Card>
  ); 
}