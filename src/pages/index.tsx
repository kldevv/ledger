import { SubmitButton, useForm } from '@/components/common';
import { z } from 'zod';
import { Layout } from '@/components/layout';
import { TransactionTable } from '@/components/transaction/TransactionTable/TransactionTable';

const schema = z.object({
  name: z.string().optional()
})

export default function IndexPage() {
  const { Form, methods } = useForm({ schema });

  return (
    <Layout>
      <div>
        <Form
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          <input name="name" {...methods.register} />
          <SubmitButton>{'hello'}</SubmitButton>
        </Form>
      </div>
    </Layout>
  );
}