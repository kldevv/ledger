import { SubmitButton, useForm } from '@/components/common';
import { z } from 'zod';
import { Layout } from '@/components/layout';
import { useQuery } from '@apollo/client'
import { useGetAllWalletsQuery } from '@/api/graphql';

const schema = z.object({
  name: z.string().optional()
})

export default function IndexPage() {
  const { Form, methods } = useForm({ schema });

  const { data, loading, error } = useGetAllWalletsQuery({
    variables: {
      ownerId: '123'
    }
  })

  console.log(data);

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