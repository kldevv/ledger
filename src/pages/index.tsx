import { Button, SubmitButton, useForm } from '@/components/view';
import { trpc } from '../utils/trpc';
import { z } from 'zod';

const schema = z.object({
  name: z.string().optional()
})

export default function IndexPage() {
  const { Form, methods } = useForm({ schema });

  return (
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
  );
}
