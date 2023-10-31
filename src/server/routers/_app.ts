import { AccountRouter } from './account';
import { router } from '../trpc';

export const appRouter = router({
  account: AccountRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;