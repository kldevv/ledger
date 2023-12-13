import { Card, useForm } from "@/components/common"
import { Input, SubmitButton } from "@/components/common/Form/Fields"
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
  const { Form, methods: { watch } } = useForm<FieldValues>({
    schema,
  });

  const handleOnSubmit = useCallback((value: FieldValues) => {
    console.log(value);
  }, []);

  return (
    <Card variant="sm">
      <Form onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <Input label="Name" name="name" placeholder="Vault name" />
          <Input
            label="Currency"
            name="currency"
            placeholder="Vault currency"
          />
          <SubmitButton>Create</SubmitButton>
        </div>
      </Form>
    </Card>
  ); 
}