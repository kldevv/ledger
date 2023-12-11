import { Layout } from '@/components/layout';
import { useRouter } from 'next/router';

const Page: React.FC = () => {
  const router = useRouter()

  const { id } = router.query

  return (
    <Layout prev="/tag">
      <h1 className="text-dark-shades font-extrabold text-3xl">{id}</h1>
    </Layout>
  );
};

export default Page;
