import { Button, SubmitButton, useForm } from '@/components/common';
import { z } from 'zod';
import { Layout } from '@/components/layout';
import { useAddWalletMutation } from '@/api/graphql';

const schema = z.object({
  name: z.string().optional()
})

export default function IndexPage() {
  const { Form, methods } = useForm({ schema });

  const [ addWallet, { data } ] = useAddWalletMutation()

  console.log(data);

  return (
    <Layout>
      <Button
        onClick={() =>
          addWallet({
            variables: {
              input: {
                ownerId: '123',
                name: 'aaa',
                currency: 'USD',
              },
            },
          })
        }
      >
        addWallet
      </Button>
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