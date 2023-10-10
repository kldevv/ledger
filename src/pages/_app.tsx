import type { AppType } from 'next/app';
import { trpc } from '@/utils/trpc';

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// TODO: Migrate to Nextjs 13 when tRPC is fully supported: https://github.com/trpc/trpc/discussions/3185
export default trpc.withTRPC(App);
