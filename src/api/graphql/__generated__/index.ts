import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApolloServerContext } from '@/api/graphql/server/context';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type AddWalletInput = {
  currency: Currency;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};

export type Currency =
  | 'EUR'
  | 'NTD'
  | 'USD';

export type Mutation = {
  __typename?: 'Mutation';
  addWallet?: Maybe<Wallet>;
};


export type MutationAddWalletArgs = {
  input: AddWalletInput;
};

export type Query = {
  __typename?: 'Query';
  getAllWallets: Array<Maybe<Wallet>>;
};


export type QueryGetAllWalletsArgs = {
  ownerId: Scalars['String']['input'];
};

export type Wallet = {
  __typename?: 'Wallet';
  createdDate: Scalars['DateTime']['output'];
  currency: Currency;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddWalletInput: AddWalletInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Wallet: ResolverTypeWrapper<Wallet>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddWalletInput: AddWalletInput;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Wallet: Wallet;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addWallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType, RequireFields<MutationAddWalletArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllWallets?: Resolver<Array<Maybe<ResolversTypes['Wallet']>>, ParentType, ContextType, RequireFields<QueryGetAllWalletsArgs, 'ownerId'>>;
};

export type WalletResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloServerContext> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
};


export type AddWalletMutationVariables = Exact<{
  input: AddWalletInput;
}>;


export type AddWalletMutation = { __typename?: 'Mutation', addWallet?: { __typename?: 'Wallet', id: string, name: string, currency: Currency, ownerId: string, createdDate: Date, updatedDate: Date } | null };

export type GetAllWalletsQueryVariables = Exact<{
  ownerId: Scalars['String']['input'];
}>;


export type GetAllWalletsQuery = { __typename?: 'Query', getAllWallets: Array<{ __typename?: 'Wallet', id: string, name: string, currency: Currency, ownerId: string } | null> };


export const AddWalletDocument = gql`
    mutation addWallet($input: AddWalletInput!) {
  addWallet(input: $input) {
    id
    name
    currency
    ownerId
    createdDate
    updatedDate
  }
}
    `;
export type AddWalletMutationFn = Apollo.MutationFunction<AddWalletMutation, AddWalletMutationVariables>;

/**
 * __useAddWalletMutation__
 *
 * To run a mutation, you first call `useAddWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWalletMutation, { data, loading, error }] = useAddWalletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddWalletMutation(baseOptions?: Apollo.MutationHookOptions<AddWalletMutation, AddWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWalletMutation, AddWalletMutationVariables>(AddWalletDocument, options);
      }
export type AddWalletMutationHookResult = ReturnType<typeof useAddWalletMutation>;
export type AddWalletMutationResult = Apollo.MutationResult<AddWalletMutation>;
export type AddWalletMutationOptions = Apollo.BaseMutationOptions<AddWalletMutation, AddWalletMutationVariables>;
export const GetAllWalletsDocument = gql`
    query getAllWallets($ownerId: String!) {
  getAllWallets(ownerId: $ownerId) {
    id
    name
    currency
    ownerId
  }
}
    `;

/**
 * __useGetAllWalletsQuery__
 *
 * To run a query within a React component, call `useGetAllWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWalletsQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useGetAllWalletsQuery(baseOptions: Apollo.QueryHookOptions<GetAllWalletsQuery, GetAllWalletsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWalletsQuery, GetAllWalletsQueryVariables>(GetAllWalletsDocument, options);
      }
export function useGetAllWalletsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWalletsQuery, GetAllWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWalletsQuery, GetAllWalletsQueryVariables>(GetAllWalletsDocument, options);
        }
export function useGetAllWalletsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllWalletsQuery, GetAllWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWalletsQuery, GetAllWalletsQueryVariables>(GetAllWalletsDocument, options);
        }
export type GetAllWalletsQueryHookResult = ReturnType<typeof useGetAllWalletsQuery>;
export type GetAllWalletsLazyQueryHookResult = ReturnType<typeof useGetAllWalletsLazyQuery>;
export type GetAllWalletsSuspenseQueryHookResult = ReturnType<typeof useGetAllWalletsSuspenseQuery>;
export type GetAllWalletsQueryResult = Apollo.QueryResult<GetAllWalletsQuery, GetAllWalletsQueryVariables>;