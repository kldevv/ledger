import { SubmitButton, useForm } from '@/components/common';
import { z } from 'zod';
import { Layout } from '@/components/layout';
import { TransactionTable } from '@/components/transaction/TransactionTable/TransactionTable';
import { Currency, Transaction } from '@prisma/client';

const schema = z.object({
  name: z.string().optional()
})

const data: Transaction[] = [
  {
    id: 1,
    title: 'hello',
    accruedDate: new Date(0),
    currency: Currency.USD,
    createdDate: new Date(0),
    updatedDate: new Date(0),
  },
  {
    id: 2,
    title: 'world',
    accruedDate: new Date(0),
    currency: Currency.USD,
    createdDate: new Date(0),
    updatedDate: new Date(0),
  }
]

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
      <div className="p-2">
        <TransactionTable transactions={data} />
      </div>
    </Layout>
  );
}