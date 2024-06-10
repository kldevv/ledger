import type { ResolverFn } from '@/api/graphql'
import type { GraphQLResolveInfo } from 'graphql'

export interface CreateResolverArgs<TResult, TParent, TContext, TArgs> {
  resolver: ResolverFn<TResult, TParent, TContext, TArgs>
}

export const createResolver = <TResult, TParent, TContext, TArgs>({
  resolver,
}: CreateResolverArgs<TResult, TParent, TContext, TArgs>) => {
  return (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
  ) => {
    return resolver(parent, args, context, info)
  }
}
