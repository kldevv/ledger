import { Button, SubmitButton, useForm } from '@/components/common';
import { z } from 'zod';
import { Layout } from '@/components/layout';
import { useAddWalletMutation } from '@/api/graphql';

const schema = z.object({
  name: z.string().optional()
})

export default function IndexPage() {
  return (
    <Layout>
    </Layout>
  );
}