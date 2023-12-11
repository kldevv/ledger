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

export type Account = {
  __typename?: 'Account';
  category: Category;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type AddVaultInput = {
  currency: Currency;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: CategoryType;
};

export type CategoryType =
  | 'ASSET'
  | 'EQUITY'
  | 'LIABILITIES';

export type Currency =
  | 'EUR'
  | 'NTD'
  | 'USD';

export type Entry = {
  __typename?: 'Entry';
  account: Account;
  credit: Scalars['Float']['output'];
  debit: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  status: Status;
  transactionDate: Scalars['DateTime']['output'];
  transactionId: Scalars['String']['output'];
  vaultId: Scalars['String']['output'];
};

export type GetEntriesInput = {
  accountId?: InputMaybe<Array<Scalars['String']['input']>>;
  creditAtLeast?: InputMaybe<Scalars['Float']['input']>;
  creditNoMore?: InputMaybe<Scalars['Float']['input']>;
  debitAtLeast?: InputMaybe<Scalars['Float']['input']>;
  debitNoMore?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  memoSearch?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Array<Status>>;
  transactionId?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addVault?: Maybe<Vault>;
};


export type MutationAddVaultArgs = {
  input: AddVaultInput;
};

export type Query = {
  __typename?: 'Query';
  getAllTransactions: Array<Transaction>;
  getAllVaults: Array<Vault>;
  getEntries: Array<Entry>;
  getTransactionDetail?: Maybe<Transaction>;
};


export type QueryGetAllTransactionsArgs = {
  vaultId: Scalars['String']['input'];
};


export type QueryGetAllVaultsArgs = {
  ownerId: Scalars['String']['input'];
};


export type QueryGetEntriesArgs = {
  input: GetEntriesInput;
};


export type QueryGetTransactionDetailArgs = {
  transactionId: Scalars['String']['input'];
};

export type Status =
  | 'COMPLETED'
  | 'PENDING';

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accrualDate: Scalars['DateTime']['output'];
  amount: Scalars['Float']['output'];
  count: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  entries: Array<Entry>;
  id: Scalars['String']['output'];
  status: Status;
  subject: Scalars['String']['output'];
  tags: Array<Tag>;
};

export type Vault = {
  __typename?: 'Vault';
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
  Account: ResolverTypeWrapper<Account>;
  AddVaultInput: AddVaultInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryType: CategoryType;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Entry: ResolverTypeWrapper<Entry>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetEntriesInput: GetEntriesInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  Transaction: ResolverTypeWrapper<Transaction>;
  Vault: ResolverTypeWrapper<Vault>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AddVaultInput: AddVaultInput;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  DateTime: Scalars['DateTime']['output'];
  Entry: Entry;
  Float: Scalars['Float']['output'];
  GetEntriesInput: GetEntriesInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  Transaction: Transaction;
  Vault: Vault;
};

export type AccountResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CategoryType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EntryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  credit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  debit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  transactionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addVault?: Resolver<Maybe<ResolversTypes['Vault']>, ParentType, ContextType, RequireFields<MutationAddVaultArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllTransactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetAllTransactionsArgs, 'vaultId'>>;
  getAllVaults?: Resolver<Array<ResolversTypes['Vault']>, ParentType, ContextType, RequireFields<QueryGetAllVaultsArgs, 'ownerId'>>;
  getEntries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryGetEntriesArgs, 'input'>>;
  getTransactionDetail?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionDetailArgs, 'transactionId'>>;
};

export type TagResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  accrualDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VaultResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Vault'] = ResolversParentTypes['Vault']> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloServerContext> = {
  Account?: AccountResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Entry?: EntryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  Vault?: VaultResolvers<ContextType>;
};


export type AddVaultMutationVariables = Exact<{
  input: AddVaultInput;
}>;


export type AddVaultMutation = { __typename?: 'Mutation', addVault?: { __typename?: 'Vault', id: string, name: string, currency: Currency, ownerId: string, createdDate: Date, updatedDate: Date } | null };

export type GetEntriesQueryVariables = Exact<{
  input: GetEntriesInput;
}>;


export type GetEntriesQuery = { __typename?: 'Query', getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo?: string | null, transactionId: string, status: Status, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetAllTransactionsQueryVariables = Exact<{
  vaultId: Scalars['String']['input'];
}>;


export type GetAllTransactionsQuery = { __typename?: 'Query', getAllTransactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, subject: string, description?: string | null, amount: number, count: number, status: Status, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetTransactionDetailQueryVariables = Exact<{
  transactionId: Scalars['String']['input'];
}>;


export type GetTransactionDetailQuery = { __typename?: 'Query', getTransactionDetail?: { __typename?: 'Transaction', id: string, accrualDate: Date, subject: string, description?: string | null, amount: number, count: number, status: Status, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, entries: Array<{ __typename?: 'Entry', id: string, transactionDate: Date, debit: number, credit: number, memo?: string | null, status: Status, account: { __typename?: 'Account', id: string, name: string } }> } | null };

export type GetAllVaultsQueryVariables = Exact<{
  ownerId: Scalars['String']['input'];
}>;


export type GetAllVaultsQuery = { __typename?: 'Query', getAllVaults: Array<{ __typename?: 'Vault', id: string, name: string, currency: Currency, ownerId: string, createdDate: Date, updatedDate: Date }> };


export const AddVaultDocument = gql`
    mutation addVault($input: AddVaultInput!) {
  addVault(input: $input) {
    id
    name
    currency
    ownerId
    createdDate
    updatedDate
  }
}
    `;
export type AddVaultMutationFn = Apollo.MutationFunction<AddVaultMutation, AddVaultMutationVariables>;

/**
 * __useAddVaultMutation__
 *
 * To run a mutation, you first call `useAddVaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVaultMutation, { data, loading, error }] = useAddVaultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddVaultMutation(baseOptions?: Apollo.MutationHookOptions<AddVaultMutation, AddVaultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVaultMutation, AddVaultMutationVariables>(AddVaultDocument, options);
      }
export type AddVaultMutationHookResult = ReturnType<typeof useAddVaultMutation>;
export type AddVaultMutationResult = Apollo.MutationResult<AddVaultMutation>;
export type AddVaultMutationOptions = Apollo.BaseMutationOptions<AddVaultMutation, AddVaultMutationVariables>;
export const GetEntriesDocument = gql`
    query getEntries($input: GetEntriesInput!) {
  getEntries(input: $input) {
    id
    vaultId
    transactionDate
    debit
    credit
    memo
    account {
      id
      name
      category {
        id
        name
        type
      }
    }
    transactionId
    status
  }
}
    `;

/**
 * __useGetEntriesQuery__
 *
 * To run a query within a React component, call `useGetEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEntriesQuery(baseOptions: Apollo.QueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, options);
      }
export function useGetEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, options);
        }
export function useGetEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, options);
        }
export type GetEntriesQueryHookResult = ReturnType<typeof useGetEntriesQuery>;
export type GetEntriesLazyQueryHookResult = ReturnType<typeof useGetEntriesLazyQuery>;
export type GetEntriesSuspenseQueryHookResult = ReturnType<typeof useGetEntriesSuspenseQuery>;
export type GetEntriesQueryResult = Apollo.QueryResult<GetEntriesQuery, GetEntriesQueryVariables>;
export const GetAllTransactionsDocument = gql`
    query getAllTransactions($vaultId: String!) {
  getAllTransactions(vaultId: $vaultId) {
    id
    accrualDate
    subject
    description
    amount
    count
    status
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllTransactionsQuery__
 *
 * To run a query within a React component, call `useGetAllTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTransactionsQuery({
 *   variables: {
 *      vaultId: // value for 'vaultId'
 *   },
 * });
 */
export function useGetAllTransactionsQuery(baseOptions: Apollo.QueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, options);
      }
export function useGetAllTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, options);
        }
export function useGetAllTransactionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, options);
        }
export type GetAllTransactionsQueryHookResult = ReturnType<typeof useGetAllTransactionsQuery>;
export type GetAllTransactionsLazyQueryHookResult = ReturnType<typeof useGetAllTransactionsLazyQuery>;
export type GetAllTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetAllTransactionsSuspenseQuery>;
export type GetAllTransactionsQueryResult = Apollo.QueryResult<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>;
export const GetTransactionDetailDocument = gql`
    query getTransactionDetail($transactionId: String!) {
  getTransactionDetail(transactionId: $transactionId) {
    id
    accrualDate
    subject
    description
    amount
    count
    status
    tags {
      id
      name
    }
    entries {
      id
      transactionDate
      debit
      credit
      memo
      account {
        id
        name
      }
      status
    }
  }
}
    `;

/**
 * __useGetTransactionDetailQuery__
 *
 * To run a query within a React component, call `useGetTransactionDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionDetailQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useGetTransactionDetailQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionDetailQuery, GetTransactionDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionDetailQuery, GetTransactionDetailQueryVariables>(GetTransactionDetailDocument, options);
      }
export function useGetTransactionDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionDetailQuery, GetTransactionDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionDetailQuery, GetTransactionDetailQueryVariables>(GetTransactionDetailDocument, options);
        }
export function useGetTransactionDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTransactionDetailQuery, GetTransactionDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTransactionDetailQuery, GetTransactionDetailQueryVariables>(GetTransactionDetailDocument, options);
        }
export type GetTransactionDetailQueryHookResult = ReturnType<typeof useGetTransactionDetailQuery>;
export type GetTransactionDetailLazyQueryHookResult = ReturnType<typeof useGetTransactionDetailLazyQuery>;
export type GetTransactionDetailSuspenseQueryHookResult = ReturnType<typeof useGetTransactionDetailSuspenseQuery>;
export type GetTransactionDetailQueryResult = Apollo.QueryResult<GetTransactionDetailQuery, GetTransactionDetailQueryVariables>;
export const GetAllVaultsDocument = gql`
    query getAllVaults($ownerId: String!) {
  getAllVaults(ownerId: $ownerId) {
    id
    name
    currency
    ownerId
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetAllVaultsQuery__
 *
 * To run a query within a React component, call `useGetAllVaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVaultsQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useGetAllVaultsQuery(baseOptions: Apollo.QueryHookOptions<GetAllVaultsQuery, GetAllVaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllVaultsQuery, GetAllVaultsQueryVariables>(GetAllVaultsDocument, options);
      }
export function useGetAllVaultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllVaultsQuery, GetAllVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllVaultsQuery, GetAllVaultsQueryVariables>(GetAllVaultsDocument, options);
        }
export function useGetAllVaultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllVaultsQuery, GetAllVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllVaultsQuery, GetAllVaultsQueryVariables>(GetAllVaultsDocument, options);
        }
export type GetAllVaultsQueryHookResult = ReturnType<typeof useGetAllVaultsQuery>;
export type GetAllVaultsLazyQueryHookResult = ReturnType<typeof useGetAllVaultsLazyQuery>;
export type GetAllVaultsSuspenseQueryHookResult = ReturnType<typeof useGetAllVaultsSuspenseQuery>;
export type GetAllVaultsQueryResult = Apollo.QueryResult<GetAllVaultsQuery, GetAllVaultsQueryVariables>;