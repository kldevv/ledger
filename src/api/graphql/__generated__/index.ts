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
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
  vaultId: Scalars['String']['output'];
};

export type AddAccountInput = {
  categoryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  vaultId: Scalars['String']['input'];
};

export type AddCategoryInput = {
  name: Scalars['String']['input'];
  type: CategoryType;
  vaultId: Scalars['String']['input'];
};

export type AddVaultInput = {
  currency: Currency;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: CategoryType;
  updatedDate: Scalars['DateTime']['output'];
  vaultId: Scalars['String']['output'];
};

export const CategoryType = {
  ASSETS: 'ASSETS',
  EQUITY: 'EQUITY',
  LIABILITIES: 'LIABILITIES'
} as const;

export type CategoryType = typeof CategoryType[keyof typeof CategoryType];
export const Currency = {
  EUR: 'EUR',
  NTD: 'NTD',
  USD: 'USD'
} as const;

export type Currency = typeof Currency[keyof typeof Currency];
export type CurrencyMeta = {
  __typename?: 'CurrencyMeta';
  icon?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  value: Currency;
};

export type Entry = {
  __typename?: 'Entry';
  account: Account;
  credit: Scalars['Float']['output'];
  debit: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  status: EntryStatus;
  transactionDate: Scalars['DateTime']['output'];
  transactionId: Scalars['String']['output'];
  vaultId: Scalars['String']['output'];
};

export const EntryStatus = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING'
} as const;

export type EntryStatus = typeof EntryStatus[keyof typeof EntryStatus];
export type GetAccountInput = {
  id: Scalars['String']['input'];
};

export type GetAccountsInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  nameSearch?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  vaultId?: InputMaybe<Scalars['String']['input']>;
};

export type GetCategoriesInput = {
  nameSearch?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CategoryType>;
  vaultId: Scalars['String']['input'];
};

export type GetCategoryInput = {
  id: Scalars['String']['input'];
};

export type GetEntriesInput = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  categoryType?: InputMaybe<Scalars['String']['input']>;
  creditAtLeast?: InputMaybe<Scalars['Float']['input']>;
  creditNoMore?: InputMaybe<Scalars['Float']['input']>;
  debitAtLeast?: InputMaybe<Scalars['Float']['input']>;
  debitNoMore?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  memoSearch?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<EntryStatus>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  vaultId?: InputMaybe<Scalars['String']['input']>;
};

export type GetTagsInput = {
  nameSearch?: InputMaybe<Scalars['String']['input']>;
  vaultId: Scalars['String']['input'];
};

export type GetTransactionInput = {
  id: Scalars['String']['input'];
};

export type GetVaultsInput = {
  currency?: InputMaybe<Currency>;
  nameSearch?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Account;
  addCategory: Category;
  addVault: Vault;
};


export type MutationAddAccountArgs = {
  input: AddAccountInput;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddVaultArgs = {
  input: AddVaultInput;
};

export type Query = {
  __typename?: 'Query';
  getAccount?: Maybe<Account>;
  getAccounts: Array<Account>;
  getAllTransactions: Array<Transaction>;
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getCurrencyMeta: Array<CurrencyMeta>;
  getEntries: Array<Entry>;
  getTags: Array<Tag>;
  getTransaction?: Maybe<Transaction>;
  getTransactionDetail?: Maybe<Transaction>;
  getVaults: Array<Vault>;
};


export type QueryGetAccountArgs = {
  input: GetAccountInput;
};


export type QueryGetAccountsArgs = {
  input: GetAccountsInput;
};


export type QueryGetAllTransactionsArgs = {
  vaultId: Scalars['String']['input'];
};


export type QueryGetCategoriesArgs = {
  input: GetCategoriesInput;
};


export type QueryGetCategoryArgs = {
  input: GetCategoryInput;
};


export type QueryGetEntriesArgs = {
  input: GetEntriesInput;
};


export type QueryGetTagsArgs = {
  input: GetTagsInput;
};


export type QueryGetTransactionArgs = {
  input: GetTransactionInput;
};


export type QueryGetTransactionDetailArgs = {
  transactionId: Scalars['String']['input'];
};


export type QueryGetVaultsArgs = {
  input: GetVaultsInput;
};

export type Tag = {
  __typename?: 'Tag';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
  vaultId: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accrualDate: Scalars['DateTime']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
  tags: Array<Tag>;
  updatedDate: Scalars['DateTime']['output'];
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
  AddAccountInput: AddAccountInput;
  AddCategoryInput: AddCategoryInput;
  AddVaultInput: AddVaultInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryType: CategoryType;
  Currency: Currency;
  CurrencyMeta: ResolverTypeWrapper<CurrencyMeta>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Entry: ResolverTypeWrapper<Entry>;
  EntryStatus: EntryStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetAccountInput: GetAccountInput;
  GetAccountsInput: GetAccountsInput;
  GetCategoriesInput: GetCategoriesInput;
  GetCategoryInput: GetCategoryInput;
  GetEntriesInput: GetEntriesInput;
  GetTagsInput: GetTagsInput;
  GetTransactionInput: GetTransactionInput;
  GetVaultsInput: GetVaultsInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  Transaction: ResolverTypeWrapper<Transaction>;
  Vault: ResolverTypeWrapper<Vault>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AddAccountInput: AddAccountInput;
  AddCategoryInput: AddCategoryInput;
  AddVaultInput: AddVaultInput;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CurrencyMeta: CurrencyMeta;
  DateTime: Scalars['DateTime']['output'];
  Entry: Entry;
  Float: Scalars['Float']['output'];
  GetAccountInput: GetAccountInput;
  GetAccountsInput: GetAccountsInput;
  GetCategoriesInput: GetCategoriesInput;
  GetCategoryInput: GetCategoryInput;
  GetEntriesInput: GetEntriesInput;
  GetTagsInput: GetTagsInput;
  GetTransactionInput: GetTransactionInput;
  GetVaultsInput: GetVaultsInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  Transaction: Transaction;
  Vault: Vault;
};

export type AccountResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CategoryType'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyMetaResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['CurrencyMeta'] = ResolversParentTypes['CurrencyMeta']> = {
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
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
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>;
  transactionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationAddAccountArgs, 'input'>>;
  addCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'input'>>;
  addVault?: Resolver<ResolversTypes['Vault'], ParentType, ContextType, RequireFields<MutationAddVaultArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountArgs, 'input'>>;
  getAccounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountsArgs, 'input'>>;
  getAllTransactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetAllTransactionsArgs, 'vaultId'>>;
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoriesArgs, 'input'>>;
  getCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoryArgs, 'input'>>;
  getCurrencyMeta?: Resolver<Array<ResolversTypes['CurrencyMeta']>, ParentType, ContextType>;
  getEntries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryGetEntriesArgs, 'input'>>;
  getTags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryGetTagsArgs, 'input'>>;
  getTransaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionArgs, 'input'>>;
  getTransactionDetail?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionDetailArgs, 'transactionId'>>;
  getVaults?: Resolver<Array<ResolversTypes['Vault']>, ParentType, ContextType, RequireFields<QueryGetVaultsArgs, 'input'>>;
};

export type TagResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  accrualDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
  CurrencyMeta?: CurrencyMetaResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Entry?: EntryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  Vault?: VaultResolvers<ContextType>;
};


export type AddAccountMutationVariables = Exact<{
  input: AddAccountInput;
}>;


export type AddAccountMutation = { __typename?: 'Mutation', addAccount: { __typename?: 'Account', id: string, name: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } } };

export type AddCategoryMutationVariables = Exact<{
  input: AddCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: string, name: string, type: CategoryType, vaultId: string, createdDate: Date, updatedDate: Date } };

export type AddVaultMutationVariables = Exact<{
  input: AddVaultInput;
}>;


export type AddVaultMutation = { __typename?: 'Mutation', addVault: { __typename?: 'Vault', id: string, name: string, currency: Currency, ownerId: string, createdDate: Date, updatedDate: Date } };

export type GetAccountQueryVariables = Exact<{
  input: GetAccountInput;
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount?: { __typename?: 'Account', id: string, name: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } } | null };

export type GetAccountDetailQueryVariables = Exact<{
  getAccountInput: GetAccountInput;
  getEntriesInput: GetEntriesInput;
}>;


export type GetAccountDetailQuery = { __typename?: 'Query', getAccount?: { __typename?: 'Account', id: string, name: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } } | null, getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo?: string | null, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetAccountsQueryVariables = Exact<{
  input: GetAccountsInput;
}>;


export type GetAccountsQuery = { __typename?: 'Query', getAccounts: Array<{ __typename?: 'Account', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } }> };

export type GetCategoriesQueryVariables = Exact<{
  input: GetCategoriesInput;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, type: CategoryType, vaultId: string, createdDate: Date, updatedDate: Date }> };

export type GetCategoryQueryVariables = Exact<{
  input: GetCategoryInput;
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: string, name: string, type: CategoryType, createdDate: Date, updatedDate: Date } | null };

export type GetCategoryDetailQueryVariables = Exact<{
  getCategoryInput: GetCategoryInput;
  getAccountsInput: GetAccountsInput;
  getEntriesInput: GetEntriesInput;
}>;


export type GetCategoryDetailQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: string, name: string, type: CategoryType, createdDate: Date, updatedDate: Date } | null, getAccounts: Array<{ __typename?: 'Account', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } }>, getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo?: string | null, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetEntriesQueryVariables = Exact<{
  input: GetEntriesInput;
}>;


export type GetEntriesQuery = { __typename?: 'Query', getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo?: string | null, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetCurrencyMetaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrencyMetaQuery = { __typename?: 'Query', getCurrencyMeta: Array<{ __typename?: 'CurrencyMeta', value: Currency, label: string, icon?: string | null }> };

export type GetTagsQueryVariables = Exact<{
  input: GetTagsInput;
}>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date }> };

export type GetAllTransactionsQueryVariables = Exact<{
  vaultId: Scalars['String']['input'];
}>;


export type GetAllTransactionsQuery = { __typename?: 'Query', getAllTransactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetTransactionQueryVariables = Exact<{
  input: GetTransactionInput;
}>;


export type GetTransactionQuery = { __typename?: 'Query', getTransaction?: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, createdDate: Date, updatedDate: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } | null };

export type GetTransactionDetailQueryVariables = Exact<{
  getTransactionInput: GetTransactionInput;
  getEntriesInput: GetEntriesInput;
}>;


export type GetTransactionDetailQuery = { __typename?: 'Query', getTransaction?: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, createdDate: Date, updatedDate: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } | null, getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo?: string | null, status: EntryStatus, transactionId: string, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetVaultsQueryVariables = Exact<{
  input: GetVaultsInput;
}>;


export type GetVaultsQuery = { __typename?: 'Query', getVaults: Array<{ __typename?: 'Vault', id: string, name: string, currency: Currency, ownerId: string, createdDate: Date, updatedDate: Date }> };


export const AddAccountDocument = gql`
    mutation addAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    id
    name
    category {
      id
      name
    }
    createdDate
    updatedDate
  }
}
    `;
export type AddAccountMutationFn = Apollo.MutationFunction<AddAccountMutation, AddAccountMutationVariables>;

/**
 * __useAddAccountMutation__
 *
 * To run a mutation, you first call `useAddAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAccountMutation, { data, loading, error }] = useAddAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAccountMutation(baseOptions?: Apollo.MutationHookOptions<AddAccountMutation, AddAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAccountMutation, AddAccountMutationVariables>(AddAccountDocument, options);
      }
export type AddAccountMutationHookResult = ReturnType<typeof useAddAccountMutation>;
export type AddAccountMutationResult = Apollo.MutationResult<AddAccountMutation>;
export type AddAccountMutationOptions = Apollo.BaseMutationOptions<AddAccountMutation, AddAccountMutationVariables>;
export const AddCategoryDocument = gql`
    mutation addCategory($input: AddCategoryInput!) {
  addCategory(input: $input) {
    id
    name
    type
    vaultId
    createdDate
    updatedDate
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
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
export const GetAccountDocument = gql`
    query getAccount($input: GetAccountInput!) {
  getAccount(input: $input) {
    id
    name
    category {
      id
      name
    }
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export function useGetAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountSuspenseQueryHookResult = ReturnType<typeof useGetAccountSuspenseQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const GetAccountDetailDocument = gql`
    query getAccountDetail($getAccountInput: GetAccountInput!, $getEntriesInput: GetEntriesInput!) {
  getAccount(input: $getAccountInput) {
    id
    name
    category {
      id
      name
    }
    createdDate
    updatedDate
  }
  getEntries(input: $getEntriesInput) {
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
 * __useGetAccountDetailQuery__
 *
 * To run a query within a React component, call `useGetAccountDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountDetailQuery({
 *   variables: {
 *      getAccountInput: // value for 'getAccountInput'
 *      getEntriesInput: // value for 'getEntriesInput'
 *   },
 * });
 */
export function useGetAccountDetailQuery(baseOptions: Apollo.QueryHookOptions<GetAccountDetailQuery, GetAccountDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountDetailQuery, GetAccountDetailQueryVariables>(GetAccountDetailDocument, options);
      }
export function useGetAccountDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountDetailQuery, GetAccountDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountDetailQuery, GetAccountDetailQueryVariables>(GetAccountDetailDocument, options);
        }
export function useGetAccountDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountDetailQuery, GetAccountDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountDetailQuery, GetAccountDetailQueryVariables>(GetAccountDetailDocument, options);
        }
export type GetAccountDetailQueryHookResult = ReturnType<typeof useGetAccountDetailQuery>;
export type GetAccountDetailLazyQueryHookResult = ReturnType<typeof useGetAccountDetailLazyQuery>;
export type GetAccountDetailSuspenseQueryHookResult = ReturnType<typeof useGetAccountDetailSuspenseQuery>;
export type GetAccountDetailQueryResult = Apollo.QueryResult<GetAccountDetailQuery, GetAccountDetailQueryVariables>;
export const GetAccountsDocument = gql`
    query getAccounts($input: GetAccountsInput!) {
  getAccounts(input: $input) {
    id
    category {
      id
      name
    }
    name
    vaultId
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions: Apollo.QueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
      }
export function useGetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export function useGetAccountsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsSuspenseQueryHookResult = ReturnType<typeof useGetAccountsSuspenseQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetCategoriesDocument = gql`
    query getCategories($input: GetCategoriesInput!) {
  getCategories(input: $input) {
    id
    name
    type
    vaultId
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = gql`
    query getCategory($input: GetCategoryInput!) {
  getCategory(input: $input) {
    id
    name
    type
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export function useGetCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategorySuspenseQueryHookResult = ReturnType<typeof useGetCategorySuspenseQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetCategoryDetailDocument = gql`
    query getCategoryDetail($getCategoryInput: GetCategoryInput!, $getAccountsInput: GetAccountsInput!, $getEntriesInput: GetEntriesInput!) {
  getCategory(input: $getCategoryInput) {
    id
    name
    type
    createdDate
    updatedDate
  }
  getAccounts(input: $getAccountsInput) {
    id
    category {
      id
      name
    }
    name
    vaultId
    createdDate
    updatedDate
  }
  getEntries(input: $getEntriesInput) {
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
 * __useGetCategoryDetailQuery__
 *
 * To run a query within a React component, call `useGetCategoryDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryDetailQuery({
 *   variables: {
 *      getCategoryInput: // value for 'getCategoryInput'
 *      getAccountsInput: // value for 'getAccountsInput'
 *      getEntriesInput: // value for 'getEntriesInput'
 *   },
 * });
 */
export function useGetCategoryDetailQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>(GetCategoryDetailDocument, options);
      }
export function useGetCategoryDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>(GetCategoryDetailDocument, options);
        }
export function useGetCategoryDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>(GetCategoryDetailDocument, options);
        }
export type GetCategoryDetailQueryHookResult = ReturnType<typeof useGetCategoryDetailQuery>;
export type GetCategoryDetailLazyQueryHookResult = ReturnType<typeof useGetCategoryDetailLazyQuery>;
export type GetCategoryDetailSuspenseQueryHookResult = ReturnType<typeof useGetCategoryDetailSuspenseQuery>;
export type GetCategoryDetailQueryResult = Apollo.QueryResult<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>;
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
export const GetCurrencyMetaDocument = gql`
    query getCurrencyMeta {
  getCurrencyMeta {
    value
    label
    icon
  }
}
    `;

/**
 * __useGetCurrencyMetaQuery__
 *
 * To run a query within a React component, call `useGetCurrencyMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrencyMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrencyMetaQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrencyMetaQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrencyMetaQuery, GetCurrencyMetaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrencyMetaQuery, GetCurrencyMetaQueryVariables>(GetCurrencyMetaDocument, options);
      }
export function useGetCurrencyMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrencyMetaQuery, GetCurrencyMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrencyMetaQuery, GetCurrencyMetaQueryVariables>(GetCurrencyMetaDocument, options);
        }
export function useGetCurrencyMetaSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrencyMetaQuery, GetCurrencyMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrencyMetaQuery, GetCurrencyMetaQueryVariables>(GetCurrencyMetaDocument, options);
        }
export type GetCurrencyMetaQueryHookResult = ReturnType<typeof useGetCurrencyMetaQuery>;
export type GetCurrencyMetaLazyQueryHookResult = ReturnType<typeof useGetCurrencyMetaLazyQuery>;
export type GetCurrencyMetaSuspenseQueryHookResult = ReturnType<typeof useGetCurrencyMetaSuspenseQuery>;
export type GetCurrencyMetaQueryResult = Apollo.QueryResult<GetCurrencyMetaQuery, GetCurrencyMetaQueryVariables>;
export const GetTagsDocument = gql`
    query getTags($input: GetTagsInput!) {
  getTags(input: $input) {
    id
    name
    vaultId
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export function useGetTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsSuspenseQueryHookResult = ReturnType<typeof useGetTagsSuspenseQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const GetAllTransactionsDocument = gql`
    query getAllTransactions($vaultId: String!) {
  getAllTransactions(vaultId: $vaultId) {
    id
    accrualDate
    note
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
export const GetTransactionDocument = gql`
    query getTransaction($input: GetTransactionInput!) {
  getTransaction(input: $input) {
    id
    accrualDate
    note
    tags {
      id
      name
    }
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetTransactionQuery__
 *
 * To run a query within a React component, call `useGetTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTransactionQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
      }
export function useGetTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
        }
export function useGetTransactionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
        }
export type GetTransactionQueryHookResult = ReturnType<typeof useGetTransactionQuery>;
export type GetTransactionLazyQueryHookResult = ReturnType<typeof useGetTransactionLazyQuery>;
export type GetTransactionSuspenseQueryHookResult = ReturnType<typeof useGetTransactionSuspenseQuery>;
export type GetTransactionQueryResult = Apollo.QueryResult<GetTransactionQuery, GetTransactionQueryVariables>;
export const GetTransactionDetailDocument = gql`
    query getTransactionDetail($getTransactionInput: GetTransactionInput!, $getEntriesInput: GetEntriesInput!) {
  getTransaction(input: $getTransactionInput) {
    id
    accrualDate
    note
    tags {
      id
      name
    }
    createdDate
    updatedDate
  }
  getEntries(input: $getEntriesInput) {
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
    status
    transactionId
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
 *      getTransactionInput: // value for 'getTransactionInput'
 *      getEntriesInput: // value for 'getEntriesInput'
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
export const GetVaultsDocument = gql`
    query getVaults($input: GetVaultsInput!) {
  getVaults(input: $input) {
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
 * __useGetVaultsQuery__
 *
 * To run a query within a React component, call `useGetVaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVaultsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetVaultsQuery(baseOptions: Apollo.QueryHookOptions<GetVaultsQuery, GetVaultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVaultsQuery, GetVaultsQueryVariables>(GetVaultsDocument, options);
      }
export function useGetVaultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVaultsQuery, GetVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVaultsQuery, GetVaultsQueryVariables>(GetVaultsDocument, options);
        }
export function useGetVaultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetVaultsQuery, GetVaultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVaultsQuery, GetVaultsQueryVariables>(GetVaultsDocument, options);
        }
export type GetVaultsQueryHookResult = ReturnType<typeof useGetVaultsQuery>;
export type GetVaultsLazyQueryHookResult = ReturnType<typeof useGetVaultsLazyQuery>;
export type GetVaultsSuspenseQueryHookResult = ReturnType<typeof useGetVaultsSuspenseQuery>;
export type GetVaultsQueryResult = Apollo.QueryResult<GetVaultsQuery, GetVaultsQueryVariables>;