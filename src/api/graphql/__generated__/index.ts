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

export type AccountTopology = {
  __typename?: 'AccountTopology';
  children: Array<AccountTopology>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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

export type AddEntryInput = {
  accountId: Scalars['String']['input'];
  credit: Scalars['Float']['input'];
  debit: Scalars['Float']['input'];
  memo: Scalars['String']['input'];
  status: EntryStatus;
  transactionDate: Scalars['DateTime']['input'];
};

export type AddTagInput = {
  name: Scalars['String']['input'];
  vaultId: Scalars['String']['input'];
};

export type AddTransactionInput = {
  accrualDate: Scalars['DateTime']['input'];
  entries: Array<AddEntryInput>;
  note: Scalars['String']['input'];
  tagIds: Array<Scalars['String']['input']>;
  vaultId: Scalars['String']['input'];
};

export type AddVaultInput = {
  currency: Currency;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};

export const AmountHandle = {
  DEBIT_CREDIT: 'DEBIT_CREDIT',
  NET: 'NET'
} as const;

export type AmountHandle = typeof AmountHandle[keyof typeof AmountHandle];
export const Basis = {
  ACCRUAL: 'ACCRUAL',
  CASH: 'CASH'
} as const;

export type Basis = typeof Basis[keyof typeof Basis];
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
export type Entry = {
  __typename?: 'Entry';
  account: Account;
  credit: Scalars['Float']['output'];
  debit: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  memo: Scalars['String']['output'];
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

export type GetAccountTopologyInput = {
  vaultId: Scalars['String']['input'];
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

export type GetReportsInput = {
  amountHandle: AmountHandle;
  basis: Basis;
  groupBy: ReportDateGroupBy;
  vaultId: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type GetTagInput = {
  id: Scalars['String']['input'];
};

export type GetTagsInput = {
  nameSearch?: InputMaybe<Scalars['String']['input']>;
  vaultId: Scalars['String']['input'];
};

export type GetTransactionInput = {
  id: Scalars['String']['input'];
};

export type GetTransactionsInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  noteSearch?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  tagId?: InputMaybe<Scalars['String']['input']>;
  vaultId: Scalars['String']['input'];
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
  addTag: Tag;
  addTransaction: Transaction;
  addVault: Vault;
  updateAccount: Account;
  updateCategory: Category;
  updateTag: Tag;
  updateTransaction: Transaction;
};


export type MutationAddAccountArgs = {
  input: AddAccountInput;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddTagArgs = {
  input: AddTagInput;
};


export type MutationAddTransactionArgs = {
  input: AddTransactionInput;
};


export type MutationAddVaultArgs = {
  input: AddVaultInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


export type MutationUpdateTransactionArgs = {
  input: UpdateTransactionInput;
};

export type Query = {
  __typename?: 'Query';
  getAccount?: Maybe<Account>;
  getAccountTopology: Array<AccountTopology>;
  getAccounts: Array<Account>;
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getEntries: Array<Entry>;
  getReports: Array<ReportData>;
  getTag?: Maybe<Tag>;
  getTags: Array<Tag>;
  getTransaction?: Maybe<Transaction>;
  getTransactionDetail?: Maybe<Transaction>;
  getTransactions: Array<Transaction>;
  getVaults: Array<Vault>;
};


export type QueryGetAccountArgs = {
  input: GetAccountInput;
};


export type QueryGetAccountTopologyArgs = {
  input: GetAccountTopologyInput;
};


export type QueryGetAccountsArgs = {
  input: GetAccountsInput;
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


export type QueryGetReportsArgs = {
  input: GetReportsInput;
};


export type QueryGetTagArgs = {
  input: GetTagInput;
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


export type QueryGetTransactionsArgs = {
  input: GetTransactionsInput;
};


export type QueryGetVaultsArgs = {
  input: GetVaultsInput;
};

export type ReportData = {
  __typename?: 'ReportData';
  amount?: Maybe<Scalars['Float']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  credit?: Maybe<Scalars['Float']['output']>;
  debit?: Maybe<Scalars['Float']['output']>;
  encode: Scalars['String']['output'];
};

export const ReportDateGroupBy = {
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  YEAR: 'YEAR'
} as const;

export type ReportDateGroupBy = typeof ReportDateGroupBy[keyof typeof ReportDateGroupBy];
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
  entries?: Maybe<Array<Entry>>;
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
  status?: Maybe<EntryStatus>;
  tags: Array<Tag>;
  updatedDate: Scalars['DateTime']['output'];
  vaultId: Scalars['String']['output'];
};

export type UpdateAccountInput = {
  categoryId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: CategoryType;
};

export type UpdateTagInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateTransactionInput = {
  accrualDate: Scalars['DateTime']['input'];
  entries: Array<AddEntryInput>;
  id: Scalars['String']['input'];
  note: Scalars['String']['input'];
  tagIds: Array<Scalars['String']['input']>;
  vaultId: Scalars['String']['input'];
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
  AccountTopology: ResolverTypeWrapper<AccountTopology>;
  AddAccountInput: AddAccountInput;
  AddCategoryInput: AddCategoryInput;
  AddEntryInput: AddEntryInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  AddVaultInput: AddVaultInput;
  AmountHandle: AmountHandle;
  Basis: Basis;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryType: CategoryType;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Entry: ResolverTypeWrapper<Entry>;
  EntryStatus: EntryStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetAccountInput: GetAccountInput;
  GetAccountTopologyInput: GetAccountTopologyInput;
  GetAccountsInput: GetAccountsInput;
  GetCategoriesInput: GetCategoriesInput;
  GetCategoryInput: GetCategoryInput;
  GetEntriesInput: GetEntriesInput;
  GetReportsInput: GetReportsInput;
  GetTagInput: GetTagInput;
  GetTagsInput: GetTagsInput;
  GetTransactionInput: GetTransactionInput;
  GetTransactionsInput: GetTransactionsInput;
  GetVaultsInput: GetVaultsInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReportData: ResolverTypeWrapper<ReportData>;
  ReportDateGroupBy: ReportDateGroupBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  Transaction: ResolverTypeWrapper<Transaction>;
  UpdateAccountInput: UpdateAccountInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
  Vault: ResolverTypeWrapper<Vault>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AccountTopology: AccountTopology;
  AddAccountInput: AddAccountInput;
  AddCategoryInput: AddCategoryInput;
  AddEntryInput: AddEntryInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  AddVaultInput: AddVaultInput;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  DateTime: Scalars['DateTime']['output'];
  Entry: Entry;
  Float: Scalars['Float']['output'];
  GetAccountInput: GetAccountInput;
  GetAccountTopologyInput: GetAccountTopologyInput;
  GetAccountsInput: GetAccountsInput;
  GetCategoriesInput: GetCategoriesInput;
  GetCategoryInput: GetCategoryInput;
  GetEntriesInput: GetEntriesInput;
  GetReportsInput: GetReportsInput;
  GetTagInput: GetTagInput;
  GetTagsInput: GetTagsInput;
  GetTransactionInput: GetTransactionInput;
  GetTransactionsInput: GetTransactionsInput;
  GetVaultsInput: GetVaultsInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  ReportData: ReportData;
  String: Scalars['String']['output'];
  Tag: Tag;
  Transaction: Transaction;
  UpdateAccountInput: UpdateAccountInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
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

export type AccountTopologyResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['AccountTopology'] = ResolversParentTypes['AccountTopology']> = {
  children?: Resolver<Array<ResolversTypes['AccountTopology']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EntryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  credit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  debit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>;
  transactionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationAddAccountArgs, 'input'>>;
  addCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'input'>>;
  addTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationAddTagArgs, 'input'>>;
  addTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationAddTransactionArgs, 'input'>>;
  addVault?: Resolver<ResolversTypes['Vault'], ParentType, ContextType, RequireFields<MutationAddVaultArgs, 'input'>>;
  updateAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'input'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'input'>>;
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'input'>>;
  updateTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationUpdateTransactionArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountArgs, 'input'>>;
  getAccountTopology?: Resolver<Array<ResolversTypes['AccountTopology']>, ParentType, ContextType, RequireFields<QueryGetAccountTopologyArgs, 'input'>>;
  getAccounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountsArgs, 'input'>>;
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoriesArgs, 'input'>>;
  getCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoryArgs, 'input'>>;
  getEntries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryGetEntriesArgs, 'input'>>;
  getReports?: Resolver<Array<ResolversTypes['ReportData']>, ParentType, ContextType, RequireFields<QueryGetReportsArgs, 'input'>>;
  getTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryGetTagArgs, 'input'>>;
  getTags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryGetTagsArgs, 'input'>>;
  getTransaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionArgs, 'input'>>;
  getTransactionDetail?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionDetailArgs, 'transactionId'>>;
  getTransactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionsArgs, 'input'>>;
  getVaults?: Resolver<Array<ResolversTypes['Vault']>, ParentType, ContextType, RequireFields<QueryGetVaultsArgs, 'input'>>;
};

export type ReportDataResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ReportData'] = ResolversParentTypes['ReportData']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  credit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  debit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  encode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  entries?: Resolver<Maybe<Array<ResolversTypes['Entry']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['EntryStatus']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  AccountTopology?: AccountTopologyResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Entry?: EntryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReportData?: ReportDataResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  Vault?: VaultResolvers<ContextType>;
};


export type AddAccountMutationVariables = Exact<{
  input: AddAccountInput;
}>;


export type AddAccountMutation = { __typename?: 'Mutation', addAccount: { __typename?: 'Account', id: string, name: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } } };

export type UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: string, name: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } } };

export type AddCategoryMutationVariables = Exact<{
  input: AddCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: string, name: string, type: CategoryType, vaultId: string, createdDate: Date, updatedDate: Date } };

export type UpdateCategoryMutationVariables = Exact<{
  input: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: string, name: string, type: CategoryType, vaultId: string, createdDate: Date, updatedDate: Date } };

export type AddTagMutationVariables = Exact<{
  input: AddTagInput;
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'Tag', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date } };

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date } };

export type AddTransactionMutationVariables = Exact<{
  input: AddTransactionInput;
}>;


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, vaultId: string, createdDate: Date, updatedDate: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, entries?: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> | null } };

export type UpdateTransactionMutationVariables = Exact<{
  input: UpdateTransactionInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, vaultId: string, createdDate: Date, updatedDate: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, entries?: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> | null } };

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


export type GetAccountDetailQuery = { __typename?: 'Query', getAccount?: { __typename?: 'Account', id: string, name: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } } | null, getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

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


export type GetCategoryDetailQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: string, name: string, type: CategoryType, createdDate: Date, updatedDate: Date } | null, getAccounts: Array<{ __typename?: 'Account', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date, category: { __typename?: 'Category', id: string, name: string } }>, getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetEntriesQueryVariables = Exact<{
  input: GetEntriesInput;
}>;


export type GetEntriesQuery = { __typename?: 'Query', getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetAccountTopologyQueryVariables = Exact<{
  input: GetAccountTopologyInput;
}>;


export type GetAccountTopologyQuery = { __typename?: 'Query', getAccountTopology: Array<{ __typename?: 'AccountTopology', id: string, name: string, children: Array<{ __typename?: 'AccountTopology', id: string, name: string, children: Array<{ __typename?: 'AccountTopology', id: string, name: string }> }> }> };

export type GetReportsQueryVariables = Exact<{
  input: GetReportsInput;
}>;


export type GetReportsQuery = { __typename?: 'Query', getReports: Array<{ __typename?: 'ReportData', encode: string, debit?: number | null, credit?: number | null, count?: number | null, amount?: number | null }> };

export type GetTagQueryVariables = Exact<{
  input: GetTagInput;
}>;


export type GetTagQuery = { __typename?: 'Query', getTag?: { __typename?: 'Tag', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date } | null };

export type GetTagDetailQueryVariables = Exact<{
  getTagInput: GetTagInput;
  getTransactionsInput: GetTransactionsInput;
}>;


export type GetTagDetailQuery = { __typename?: 'Query', getTag?: { __typename?: 'Tag', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date } | null, getTransactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, vaultId: string, status?: EntryStatus | null, createdDate: Date, updatedDate: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetTagsQueryVariables = Exact<{
  input: GetTagsInput;
}>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', id: string, name: string, vaultId: string, createdDate: Date, updatedDate: Date }> };

export type GetTransactionQueryVariables = Exact<{
  input: GetTransactionInput;
}>;


export type GetTransactionQuery = { __typename?: 'Query', getTransaction?: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, vaultId: string, createdDate: Date, updatedDate: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } | null };

export type GetTransactionDetailQueryVariables = Exact<{
  getTransactionInput: GetTransactionInput;
  getEntriesInput: GetEntriesInput;
}>;


export type GetTransactionDetailQuery = { __typename?: 'Query', getTransaction?: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, createdDate: Date, updatedDate: Date, vaultId: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } | null, getEntries: Array<{ __typename?: 'Entry', id: string, vaultId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, account: { __typename?: 'Account', id: string, name: string, category: { __typename?: 'Category', id: string, name: string, type: CategoryType } } }> };

export type GetTransactionsQueryVariables = Exact<{
  input: GetTransactionsInput;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, vaultId: string, status?: EntryStatus | null, createdDate: Date, updatedDate: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

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
export const UpdateAccountDocument = gql`
    mutation updateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
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
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
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
export const UpdateCategoryDocument = gql`
    mutation updateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    id
    name
    type
    vaultId
    createdDate
    updatedDate
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const AddTagDocument = gql`
    mutation addTag($input: AddTagInput!) {
  addTag(input: $input) {
    id
    name
    vaultId
    createdDate
    updatedDate
  }
}
    `;
export type AddTagMutationFn = Apollo.MutationFunction<AddTagMutation, AddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTagMutation(baseOptions?: Apollo.MutationHookOptions<AddTagMutation, AddTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, options);
      }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = Apollo.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = Apollo.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const UpdateTagDocument = gql`
    mutation updateTag($input: UpdateTagInput!) {
  updateTag(input: $input) {
    id
    name
    vaultId
    createdDate
    updatedDate
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, options);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>;
export const AddTransactionDocument = gql`
    mutation addTransaction($input: AddTransactionInput!) {
  addTransaction(input: $input) {
    id
    accrualDate
    note
    vaultId
    tags {
      id
      name
    }
    entries {
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
    createdDate
    updatedDate
  }
}
    `;
export type AddTransactionMutationFn = Apollo.MutationFunction<AddTransactionMutation, AddTransactionMutationVariables>;

/**
 * __useAddTransactionMutation__
 *
 * To run a mutation, you first call `useAddTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTransactionMutation, { data, loading, error }] = useAddTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTransactionMutation(baseOptions?: Apollo.MutationHookOptions<AddTransactionMutation, AddTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTransactionMutation, AddTransactionMutationVariables>(AddTransactionDocument, options);
      }
export type AddTransactionMutationHookResult = ReturnType<typeof useAddTransactionMutation>;
export type AddTransactionMutationResult = Apollo.MutationResult<AddTransactionMutation>;
export type AddTransactionMutationOptions = Apollo.BaseMutationOptions<AddTransactionMutation, AddTransactionMutationVariables>;
export const UpdateTransactionDocument = gql`
    mutation updateTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    id
    accrualDate
    note
    vaultId
    tags {
      id
      name
    }
    entries {
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
    createdDate
    updatedDate
  }
}
    `;
export type UpdateTransactionMutationFn = Apollo.MutationFunction<UpdateTransactionMutation, UpdateTransactionMutationVariables>;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionMutation, { data, loading, error }] = useUpdateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(UpdateTransactionDocument, options);
      }
export type UpdateTransactionMutationHookResult = ReturnType<typeof useUpdateTransactionMutation>;
export type UpdateTransactionMutationResult = Apollo.MutationResult<UpdateTransactionMutation>;
export type UpdateTransactionMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
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
export const GetAccountTopologyDocument = gql`
    query getAccountTopology($input: GetAccountTopologyInput!) {
  getAccountTopology(input: $input) {
    id
    name
    children {
      id
      name
      children {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetAccountTopologyQuery__
 *
 * To run a query within a React component, call `useGetAccountTopologyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountTopologyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountTopologyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountTopologyQuery(baseOptions: Apollo.QueryHookOptions<GetAccountTopologyQuery, GetAccountTopologyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountTopologyQuery, GetAccountTopologyQueryVariables>(GetAccountTopologyDocument, options);
      }
export function useGetAccountTopologyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountTopologyQuery, GetAccountTopologyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountTopologyQuery, GetAccountTopologyQueryVariables>(GetAccountTopologyDocument, options);
        }
export function useGetAccountTopologySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountTopologyQuery, GetAccountTopologyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountTopologyQuery, GetAccountTopologyQueryVariables>(GetAccountTopologyDocument, options);
        }
export type GetAccountTopologyQueryHookResult = ReturnType<typeof useGetAccountTopologyQuery>;
export type GetAccountTopologyLazyQueryHookResult = ReturnType<typeof useGetAccountTopologyLazyQuery>;
export type GetAccountTopologySuspenseQueryHookResult = ReturnType<typeof useGetAccountTopologySuspenseQuery>;
export type GetAccountTopologyQueryResult = Apollo.QueryResult<GetAccountTopologyQuery, GetAccountTopologyQueryVariables>;
export const GetReportsDocument = gql`
    query getReports($input: GetReportsInput!) {
  getReports(input: $input) {
    encode
    debit
    credit
    count
    amount
  }
}
    `;

/**
 * __useGetReportsQuery__
 *
 * To run a query within a React component, call `useGetReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetReportsQuery(baseOptions: Apollo.QueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, options);
      }
export function useGetReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, options);
        }
export function useGetReportsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, options);
        }
export type GetReportsQueryHookResult = ReturnType<typeof useGetReportsQuery>;
export type GetReportsLazyQueryHookResult = ReturnType<typeof useGetReportsLazyQuery>;
export type GetReportsSuspenseQueryHookResult = ReturnType<typeof useGetReportsSuspenseQuery>;
export type GetReportsQueryResult = Apollo.QueryResult<GetReportsQuery, GetReportsQueryVariables>;
export const GetTagDocument = gql`
    query getTag($input: GetTagInput!) {
  getTag(input: $input) {
    id
    name
    vaultId
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetTagQuery__
 *
 * To run a query within a React component, call `useGetTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTagQuery(baseOptions: Apollo.QueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, options);
      }
export function useGetTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, options);
        }
export function useGetTagSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, options);
        }
export type GetTagQueryHookResult = ReturnType<typeof useGetTagQuery>;
export type GetTagLazyQueryHookResult = ReturnType<typeof useGetTagLazyQuery>;
export type GetTagSuspenseQueryHookResult = ReturnType<typeof useGetTagSuspenseQuery>;
export type GetTagQueryResult = Apollo.QueryResult<GetTagQuery, GetTagQueryVariables>;
export const GetTagDetailDocument = gql`
    query getTagDetail($getTagInput: GetTagInput!, $getTransactionsInput: GetTransactionsInput!) {
  getTag(input: $getTagInput) {
    id
    name
    vaultId
    createdDate
    updatedDate
  }
  getTransactions(input: $getTransactionsInput) {
    id
    accrualDate
    note
    tags {
      id
      name
    }
    vaultId
    status
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetTagDetailQuery__
 *
 * To run a query within a React component, call `useGetTagDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagDetailQuery({
 *   variables: {
 *      getTagInput: // value for 'getTagInput'
 *      getTransactionsInput: // value for 'getTransactionsInput'
 *   },
 * });
 */
export function useGetTagDetailQuery(baseOptions: Apollo.QueryHookOptions<GetTagDetailQuery, GetTagDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagDetailQuery, GetTagDetailQueryVariables>(GetTagDetailDocument, options);
      }
export function useGetTagDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagDetailQuery, GetTagDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagDetailQuery, GetTagDetailQueryVariables>(GetTagDetailDocument, options);
        }
export function useGetTagDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTagDetailQuery, GetTagDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTagDetailQuery, GetTagDetailQueryVariables>(GetTagDetailDocument, options);
        }
export type GetTagDetailQueryHookResult = ReturnType<typeof useGetTagDetailQuery>;
export type GetTagDetailLazyQueryHookResult = ReturnType<typeof useGetTagDetailLazyQuery>;
export type GetTagDetailSuspenseQueryHookResult = ReturnType<typeof useGetTagDetailSuspenseQuery>;
export type GetTagDetailQueryResult = Apollo.QueryResult<GetTagDetailQuery, GetTagDetailQueryVariables>;
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
    vaultId
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
    vaultId
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
export const GetTransactionsDocument = gql`
    query getTransactions($input: GetTransactionsInput!) {
  getTransactions(input: $input) {
    id
    accrualDate
    note
    tags {
      id
      name
    }
    vaultId
    status
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export function useGetTransactionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetTransactionsSuspenseQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
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