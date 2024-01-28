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
  category?: Maybe<Category>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  treasuryBookId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AddAccountInput = {
  categoryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  treasuryBookId: Scalars['String']['input'];
};

export type AddCategoryInput = {
  name: Scalars['String']['input'];
  treasuryBookId: Scalars['String']['input'];
  type: CategoryType;
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
  treasuryBookId: Scalars['String']['input'];
  type: TagType;
};

export type AddTransactionInput = {
  accrualDate: Scalars['DateTime']['input'];
  entries: Array<AddEntryInput>;
  note: Scalars['String']['input'];
  tagIds: Array<Scalars['String']['input']>;
  treasuryBookId: Scalars['String']['input'];
};

export type AddTreasuryBookInput = {
  currency: Currency;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};

export type Amount = {
  __typename?: 'Amount';
  credit: Scalars['Float']['output'];
  debit: Scalars['Float']['output'];
};

export type AmountOnMonth = {
  __typename?: 'AmountOnMonth';
  amount: Amount;
  month: Scalars['Int']['output'];
};

export type Category = {
  __typename?: 'Category';
  accountCount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  treasuryBookId: Scalars['String']['output'];
  type: CategoryType;
  updatedAt: Scalars['DateTime']['output'];
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
  RMB: 'RMB',
  USD: 'USD'
} as const;

export type Currency = typeof Currency[keyof typeof Currency];
export const DateType = {
  ACCRUAL: 'ACCRUAL',
  TRANSACTION: 'TRANSACTION'
} as const;

export type DateType = typeof DateType[keyof typeof DateType];
export type Entry = {
  __typename?: 'Entry';
  account?: Maybe<Account>;
  credit: Scalars['Float']['output'];
  debit: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  memo: Scalars['String']['output'];
  status: EntryStatus;
  transactionDate: Scalars['DateTime']['output'];
  transactionId: Scalars['String']['output'];
  treasuryBookId: Scalars['String']['output'];
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
  treasuryBookId: Scalars['String']['input'];
};

export type GetCategoriesInput = {
  nameSearch?: InputMaybe<Scalars['String']['input']>;
  treasuryBookId: Scalars['String']['input'];
  type?: InputMaybe<CategoryType>;
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
  treasuryBookId: Scalars['String']['input'];
};

export type GetMonthlyAmountInput = {
  status?: InputMaybe<EntryStatus>;
  treasuryBookId: Scalars['String']['input'];
  type: DateType;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type GetTagInput = {
  id: Scalars['String']['input'];
};

export type GetTagsInput = {
  treasuryBookId: Scalars['String']['input'];
};

export type GetTransactionInput = {
  id: Scalars['String']['input'];
};

export type GetTransactionsInput = {
  status?: InputMaybe<EntryStatus>;
  tagId?: InputMaybe<Scalars['String']['input']>;
  treasuryBookId: Scalars['String']['input'];
};

export type GetTreasuryBooksInput = {
  currency?: InputMaybe<Currency>;
  ownerId: Scalars['String']['input'];
};

export type GetUniqueYearsInput = {
  treasuryBookId: Scalars['String']['input'];
  type: DateType;
};

export type MonthlyAmount = {
  __typename?: 'MonthlyAmount';
  amounts: Array<AmountOnMonth>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Account;
  addCategory: Category;
  addTag: Tag;
  addTransaction: Transaction;
  addTreasuryBook: TreasuryBook;
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


export type MutationAddTreasuryBookArgs = {
  input: AddTreasuryBookInput;
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
  getAccountMonthlyBalance: Array<MonthlyAmount>;
  getAccountMonthlyChanges: Array<MonthlyAmount>;
  getAccounts: Array<Account>;
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getCategoryMonthlyBalance: Array<MonthlyAmount>;
  getCategoryMonthlyChanges: Array<MonthlyAmount>;
  getCategoryTypeMonthlyBalance: Array<MonthlyAmount>;
  getCategoryTypeMonthlyChanges: Array<MonthlyAmount>;
  getEntries: Array<Entry>;
  getTag?: Maybe<Tag>;
  getTags: Array<Tag>;
  getTransaction?: Maybe<Transaction>;
  getTransactionDetail?: Maybe<Transaction>;
  getTransactions: Array<Transaction>;
  getTreasuryBooks: Array<TreasuryBook>;
  getUniqueYears: Array<Scalars['Int']['output']>;
};


export type QueryGetAccountArgs = {
  input: GetAccountInput;
};


export type QueryGetAccountMonthlyBalanceArgs = {
  input: GetMonthlyAmountInput;
};


export type QueryGetAccountMonthlyChangesArgs = {
  input: GetMonthlyAmountInput;
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


export type QueryGetCategoryMonthlyBalanceArgs = {
  input: GetMonthlyAmountInput;
};


export type QueryGetCategoryMonthlyChangesArgs = {
  input: GetMonthlyAmountInput;
};


export type QueryGetCategoryTypeMonthlyBalanceArgs = {
  input: GetMonthlyAmountInput;
};


export type QueryGetCategoryTypeMonthlyChangesArgs = {
  input: GetMonthlyAmountInput;
};


export type QueryGetEntriesArgs = {
  input: GetEntriesInput;
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


export type QueryGetTreasuryBooksArgs = {
  input: GetTreasuryBooksInput;
};


export type QueryGetUniqueYearsArgs = {
  input: GetUniqueYearsInput;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  treasuryBookId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export const TagType = {
  ARAP: 'ARAP',
  CUSTOM: 'CUSTOM',
  DEPRECIATION: 'DEPRECIATION',
  PREPAID: 'PREPAID'
} as const;

export type TagType = typeof TagType[keyof typeof TagType];
export type Transaction = {
  __typename?: 'Transaction';
  accrualDate: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  entries?: Maybe<Array<Entry>>;
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
  status?: Maybe<EntryStatus>;
  tags: Array<Tag>;
  treasuryBookId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TreasuryBook = {
  __typename?: 'TreasuryBook';
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  treasuryBookId: Scalars['String']['input'];
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
  AddEntryInput: AddEntryInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  AddTreasuryBookInput: AddTreasuryBookInput;
  Amount: ResolverTypeWrapper<Amount>;
  AmountOnMonth: ResolverTypeWrapper<AmountOnMonth>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryType: CategoryType;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateType: DateType;
  Entry: ResolverTypeWrapper<Entry>;
  EntryStatus: EntryStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetAccountInput: GetAccountInput;
  GetAccountsInput: GetAccountsInput;
  GetCategoriesInput: GetCategoriesInput;
  GetCategoryInput: GetCategoryInput;
  GetEntriesInput: GetEntriesInput;
  GetMonthlyAmountInput: GetMonthlyAmountInput;
  GetTagInput: GetTagInput;
  GetTagsInput: GetTagsInput;
  GetTransactionInput: GetTransactionInput;
  GetTransactionsInput: GetTransactionsInput;
  GetTreasuryBooksInput: GetTreasuryBooksInput;
  GetUniqueYearsInput: GetUniqueYearsInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MonthlyAmount: ResolverTypeWrapper<MonthlyAmount>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagType: TagType;
  Transaction: ResolverTypeWrapper<Transaction>;
  TreasuryBook: ResolverTypeWrapper<TreasuryBook>;
  UpdateAccountInput: UpdateAccountInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AddAccountInput: AddAccountInput;
  AddCategoryInput: AddCategoryInput;
  AddEntryInput: AddEntryInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  AddTreasuryBookInput: AddTreasuryBookInput;
  Amount: Amount;
  AmountOnMonth: AmountOnMonth;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  DateTime: Scalars['DateTime']['output'];
  Entry: Entry;
  Float: Scalars['Float']['output'];
  GetAccountInput: GetAccountInput;
  GetAccountsInput: GetAccountsInput;
  GetCategoriesInput: GetCategoriesInput;
  GetCategoryInput: GetCategoryInput;
  GetEntriesInput: GetEntriesInput;
  GetMonthlyAmountInput: GetMonthlyAmountInput;
  GetTagInput: GetTagInput;
  GetTagsInput: GetTagsInput;
  GetTransactionInput: GetTransactionInput;
  GetTransactionsInput: GetTransactionsInput;
  GetTreasuryBooksInput: GetTreasuryBooksInput;
  GetUniqueYearsInput: GetUniqueYearsInput;
  Int: Scalars['Int']['output'];
  MonthlyAmount: MonthlyAmount;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  Transaction: Transaction;
  TreasuryBook: TreasuryBook;
  UpdateAccountInput: UpdateAccountInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
};

export type AccountResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  treasuryBookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AmountResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Amount'] = ResolversParentTypes['Amount']> = {
  credit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  debit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AmountOnMonthResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['AmountOnMonth'] = ResolversParentTypes['AmountOnMonth']> = {
  amount?: Resolver<ResolversTypes['Amount'], ParentType, ContextType>;
  month?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  accountCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  treasuryBookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CategoryType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EntryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  credit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  debit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  memo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>;
  transactionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  treasuryBookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MonthlyAmountResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['MonthlyAmount'] = ResolversParentTypes['MonthlyAmount']> = {
  amounts?: Resolver<Array<ResolversTypes['AmountOnMonth']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationAddAccountArgs, 'input'>>;
  addCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'input'>>;
  addTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationAddTagArgs, 'input'>>;
  addTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationAddTransactionArgs, 'input'>>;
  addTreasuryBook?: Resolver<ResolversTypes['TreasuryBook'], ParentType, ContextType, RequireFields<MutationAddTreasuryBookArgs, 'input'>>;
  updateAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'input'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'input'>>;
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'input'>>;
  updateTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationUpdateTransactionArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountArgs, 'input'>>;
  getAccountMonthlyBalance?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryGetAccountMonthlyBalanceArgs, 'input'>>;
  getAccountMonthlyChanges?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryGetAccountMonthlyChangesArgs, 'input'>>;
  getAccounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountsArgs, 'input'>>;
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoriesArgs, 'input'>>;
  getCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoryArgs, 'input'>>;
  getCategoryMonthlyBalance?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryGetCategoryMonthlyBalanceArgs, 'input'>>;
  getCategoryMonthlyChanges?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryGetCategoryMonthlyChangesArgs, 'input'>>;
  getCategoryTypeMonthlyBalance?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryGetCategoryTypeMonthlyBalanceArgs, 'input'>>;
  getCategoryTypeMonthlyChanges?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryGetCategoryTypeMonthlyChangesArgs, 'input'>>;
  getEntries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryGetEntriesArgs, 'input'>>;
  getTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryGetTagArgs, 'input'>>;
  getTags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryGetTagsArgs, 'input'>>;
  getTransaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionArgs, 'input'>>;
  getTransactionDetail?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionDetailArgs, 'transactionId'>>;
  getTransactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionsArgs, 'input'>>;
  getTreasuryBooks?: Resolver<Array<ResolversTypes['TreasuryBook']>, ParentType, ContextType, RequireFields<QueryGetTreasuryBooksArgs, 'input'>>;
  getUniqueYears?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryGetUniqueYearsArgs, 'input'>>;
};

export type TagResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  treasuryBookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  accrualDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  entries?: Resolver<Maybe<Array<ResolversTypes['Entry']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['EntryStatus']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  treasuryBookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TreasuryBookResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TreasuryBook'] = ResolversParentTypes['TreasuryBook']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloServerContext> = {
  Account?: AccountResolvers<ContextType>;
  Amount?: AmountResolvers<ContextType>;
  AmountOnMonth?: AmountOnMonthResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Entry?: EntryResolvers<ContextType>;
  MonthlyAmount?: MonthlyAmountResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TreasuryBook?: TreasuryBookResolvers<ContextType>;
};


export type AddAccountMutationVariables = Exact<{
  input: AddAccountInput;
}>;


export type AddAccountMutation = { __typename?: 'Mutation', addAccount: { __typename?: 'Account', id: string, name: string, createdAt: Date, updatedAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null } };

export type UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: string, name: string, createdAt: Date, updatedAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null } };

export type AddCategoryMutationVariables = Exact<{
  input: AddCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: string, name: string, type: CategoryType, treasuryBookId: string, createdAt: Date, updatedAt: Date } };

export type UpdateCategoryMutationVariables = Exact<{
  input: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: string, name: string, type: CategoryType, treasuryBookId: string, createdAt: Date, updatedAt: Date } };

export type AddTagMutationVariables = Exact<{
  input: AddTagInput;
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'Tag', id: string, name: string, treasuryBookId: string, createdAt: Date, updatedAt: Date } };

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', id: string, name: string, treasuryBookId: string, createdAt: Date, updatedAt: Date } };

export type AddTransactionMutationVariables = Exact<{
  input: AddTransactionInput;
}>;


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, treasuryBookId: string, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, entries?: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> | null } };

export type UpdateTransactionMutationVariables = Exact<{
  input: UpdateTransactionInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, treasuryBookId: string, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, entries?: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> | null } };

export type AddTreasuryBookMutationVariables = Exact<{
  input: AddTreasuryBookInput;
}>;


export type AddTreasuryBookMutation = { __typename?: 'Mutation', addTreasuryBook: { __typename?: 'TreasuryBook', id: string, name: string, currency: Currency, ownerId: string, createdAt: Date, updatedAt: Date } };

export type GetAccountQueryVariables = Exact<{
  input: GetAccountInput;
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount?: { __typename?: 'Account', id: string, name: string, createdAt: Date, updatedAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null } | null };

export type GetAccountDetailQueryVariables = Exact<{
  getAccountInput: GetAccountInput;
  getEntriesInput: GetEntriesInput;
}>;


export type GetAccountDetailQuery = { __typename?: 'Query', getAccount?: { __typename?: 'Account', id: string, name: string, createdAt: Date, updatedAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null } | null, getEntries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type GetAccountsQueryVariables = Exact<{
  input: GetAccountsInput;
}>;


export type GetAccountsQuery = { __typename?: 'Query', getAccounts: Array<{ __typename?: 'Account', id: string, name: string, treasuryBookId: string, createdAt: Date, updatedAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null }> };

export type GetCategoriesQueryVariables = Exact<{
  input: GetCategoriesInput;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, type: CategoryType, accountCount?: number | null, treasuryBookId: string, createdAt: Date, updatedAt: Date }> };

export type GetCategoryQueryVariables = Exact<{
  input: GetCategoryInput;
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: string, name: string, type: CategoryType, createdAt: Date, updatedAt: Date } | null };

export type GetCategoryDetailQueryVariables = Exact<{
  getCategoryInput: GetCategoryInput;
  getAccountsInput: GetAccountsInput;
  getEntriesInput: GetEntriesInput;
}>;


export type GetCategoryDetailQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: string, name: string, type: CategoryType, createdAt: Date, updatedAt: Date } | null, getAccounts: Array<{ __typename?: 'Account', id: string, name: string, treasuryBookId: string, createdAt: Date, updatedAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null }>, getEntries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type GetEntriesQueryVariables = Exact<{
  input: GetEntriesInput;
}>;


export type GetEntriesQuery = { __typename?: 'Query', getEntries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, transactionId: string, status: EntryStatus, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type MonthlyAmountDataFragment = { __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> };

export type GetAccountMonthlyBalanceQueryVariables = Exact<{
  input: GetMonthlyAmountInput;
}>;


export type GetAccountMonthlyBalanceQuery = { __typename?: 'Query', getAccountMonthlyBalance: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type GetAccountMonthlyChangesQueryVariables = Exact<{
  input: GetMonthlyAmountInput;
}>;


export type GetAccountMonthlyChangesQuery = { __typename?: 'Query', getAccountMonthlyChanges: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type GetCategoryMonthlyBalanceQueryVariables = Exact<{
  input: GetMonthlyAmountInput;
}>;


export type GetCategoryMonthlyBalanceQuery = { __typename?: 'Query', getCategoryMonthlyBalance: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type GetCategoryMonthlyChangesQueryVariables = Exact<{
  input: GetMonthlyAmountInput;
}>;


export type GetCategoryMonthlyChangesQuery = { __typename?: 'Query', getCategoryMonthlyChanges: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type GetCategoryTypeMonthlyBalanceQueryVariables = Exact<{
  input: GetMonthlyAmountInput;
}>;


export type GetCategoryTypeMonthlyBalanceQuery = { __typename?: 'Query', getCategoryTypeMonthlyBalance: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type GetCategoryTypeMonthlyChangesQueryVariables = Exact<{
  input: GetMonthlyAmountInput;
}>;


export type GetCategoryTypeMonthlyChangesQuery = { __typename?: 'Query', getCategoryTypeMonthlyChanges: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type GetUniqueYearsQueryVariables = Exact<{
  input: GetUniqueYearsInput;
}>;


export type GetUniqueYearsQuery = { __typename?: 'Query', getUniqueYears: Array<number> };

export type GetTagQueryVariables = Exact<{
  input: GetTagInput;
}>;


export type GetTagQuery = { __typename?: 'Query', getTag?: { __typename?: 'Tag', id: string, name: string, treasuryBookId: string, createdAt: Date, updatedAt: Date } | null };

export type GetTagDetailQueryVariables = Exact<{
  getTagInput: GetTagInput;
  getTransactionsInput: GetTransactionsInput;
}>;


export type GetTagDetailQuery = { __typename?: 'Query', getTag?: { __typename?: 'Tag', id: string, name: string, treasuryBookId: string, createdAt: Date, updatedAt: Date } | null, getTransactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, treasuryBookId: string, status?: EntryStatus | null, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetTagsQueryVariables = Exact<{
  input: GetTagsInput;
}>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', id: string, name: string, treasuryBookId: string, createdAt: Date, updatedAt: Date }> };

export type GetTransactionQueryVariables = Exact<{
  input: GetTransactionInput;
}>;


export type GetTransactionQuery = { __typename?: 'Query', getTransaction?: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, treasuryBookId: string, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } | null };

export type GetTransactionDetailQueryVariables = Exact<{
  getTransactionInput: GetTransactionInput;
  getEntriesInput: GetEntriesInput;
}>;


export type GetTransactionDetailQuery = { __typename?: 'Query', getTransaction?: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, createdAt: Date, updatedAt: Date, treasuryBookId: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } | null, getEntries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type GetTransactionsQueryVariables = Exact<{
  input: GetTransactionsInput;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, treasuryBookId: string, status?: EntryStatus | null, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetTreasuryBooksQueryVariables = Exact<{
  input: GetTreasuryBooksInput;
}>;


export type GetTreasuryBooksQuery = { __typename?: 'Query', getTreasuryBooks: Array<{ __typename?: 'TreasuryBook', id: string, name: string, currency: Currency, ownerId: string, createdAt: Date, updatedAt: Date }> };

export const MonthlyAmountDataFragmentDoc = gql`
    fragment MonthlyAmountData on MonthlyAmount {
  id
  name
  amounts {
    month
    amount {
      debit
      credit
    }
  }
}
    `;
export const AddAccountDocument = gql`
    mutation addAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    id
    name
    category {
      id
      name
    }
    createdAt
    updatedAt
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
    createdAt
    updatedAt
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
    treasuryBookId
    createdAt
    updatedAt
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
    treasuryBookId
    createdAt
    updatedAt
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
    treasuryBookId
    createdAt
    updatedAt
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
    treasuryBookId
    createdAt
    updatedAt
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
    treasuryBookId
    tags {
      id
      name
    }
    entries {
      id
      treasuryBookId
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
    createdAt
    updatedAt
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
    treasuryBookId
    tags {
      id
      name
    }
    entries {
      id
      treasuryBookId
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
    createdAt
    updatedAt
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
export const AddTreasuryBookDocument = gql`
    mutation addTreasuryBook($input: AddTreasuryBookInput!) {
  addTreasuryBook(input: $input) {
    id
    name
    currency
    ownerId
    createdAt
    updatedAt
  }
}
    `;
export type AddTreasuryBookMutationFn = Apollo.MutationFunction<AddTreasuryBookMutation, AddTreasuryBookMutationVariables>;

/**
 * __useAddTreasuryBookMutation__
 *
 * To run a mutation, you first call `useAddTreasuryBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTreasuryBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTreasuryBookMutation, { data, loading, error }] = useAddTreasuryBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTreasuryBookMutation(baseOptions?: Apollo.MutationHookOptions<AddTreasuryBookMutation, AddTreasuryBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTreasuryBookMutation, AddTreasuryBookMutationVariables>(AddTreasuryBookDocument, options);
      }
export type AddTreasuryBookMutationHookResult = ReturnType<typeof useAddTreasuryBookMutation>;
export type AddTreasuryBookMutationResult = Apollo.MutationResult<AddTreasuryBookMutation>;
export type AddTreasuryBookMutationOptions = Apollo.BaseMutationOptions<AddTreasuryBookMutation, AddTreasuryBookMutationVariables>;
export const GetAccountDocument = gql`
    query getAccount($input: GetAccountInput!) {
  getAccount(input: $input) {
    id
    name
    category {
      id
      name
    }
    createdAt
    updatedAt
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
    createdAt
    updatedAt
  }
  getEntries(input: $getEntriesInput) {
    id
    treasuryBookId
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
    treasuryBookId
    createdAt
    updatedAt
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
    accountCount
    treasuryBookId
    createdAt
    updatedAt
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
    createdAt
    updatedAt
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
    createdAt
    updatedAt
  }
  getAccounts(input: $getAccountsInput) {
    id
    category {
      id
      name
    }
    name
    treasuryBookId
    createdAt
    updatedAt
  }
  getEntries(input: $getEntriesInput) {
    id
    treasuryBookId
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
    treasuryBookId
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
export const GetAccountMonthlyBalanceDocument = gql`
    query getAccountMonthlyBalance($input: GetMonthlyAmountInput!) {
  getAccountMonthlyBalance(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useGetAccountMonthlyBalanceQuery__
 *
 * To run a query within a React component, call `useGetAccountMonthlyBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountMonthlyBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountMonthlyBalanceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountMonthlyBalanceQuery(baseOptions: Apollo.QueryHookOptions<GetAccountMonthlyBalanceQuery, GetAccountMonthlyBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountMonthlyBalanceQuery, GetAccountMonthlyBalanceQueryVariables>(GetAccountMonthlyBalanceDocument, options);
      }
export function useGetAccountMonthlyBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountMonthlyBalanceQuery, GetAccountMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountMonthlyBalanceQuery, GetAccountMonthlyBalanceQueryVariables>(GetAccountMonthlyBalanceDocument, options);
        }
export function useGetAccountMonthlyBalanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountMonthlyBalanceQuery, GetAccountMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountMonthlyBalanceQuery, GetAccountMonthlyBalanceQueryVariables>(GetAccountMonthlyBalanceDocument, options);
        }
export type GetAccountMonthlyBalanceQueryHookResult = ReturnType<typeof useGetAccountMonthlyBalanceQuery>;
export type GetAccountMonthlyBalanceLazyQueryHookResult = ReturnType<typeof useGetAccountMonthlyBalanceLazyQuery>;
export type GetAccountMonthlyBalanceSuspenseQueryHookResult = ReturnType<typeof useGetAccountMonthlyBalanceSuspenseQuery>;
export type GetAccountMonthlyBalanceQueryResult = Apollo.QueryResult<GetAccountMonthlyBalanceQuery, GetAccountMonthlyBalanceQueryVariables>;
export const GetAccountMonthlyChangesDocument = gql`
    query getAccountMonthlyChanges($input: GetMonthlyAmountInput!) {
  getAccountMonthlyChanges(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useGetAccountMonthlyChangesQuery__
 *
 * To run a query within a React component, call `useGetAccountMonthlyChangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountMonthlyChangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountMonthlyChangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountMonthlyChangesQuery(baseOptions: Apollo.QueryHookOptions<GetAccountMonthlyChangesQuery, GetAccountMonthlyChangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountMonthlyChangesQuery, GetAccountMonthlyChangesQueryVariables>(GetAccountMonthlyChangesDocument, options);
      }
export function useGetAccountMonthlyChangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountMonthlyChangesQuery, GetAccountMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountMonthlyChangesQuery, GetAccountMonthlyChangesQueryVariables>(GetAccountMonthlyChangesDocument, options);
        }
export function useGetAccountMonthlyChangesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountMonthlyChangesQuery, GetAccountMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountMonthlyChangesQuery, GetAccountMonthlyChangesQueryVariables>(GetAccountMonthlyChangesDocument, options);
        }
export type GetAccountMonthlyChangesQueryHookResult = ReturnType<typeof useGetAccountMonthlyChangesQuery>;
export type GetAccountMonthlyChangesLazyQueryHookResult = ReturnType<typeof useGetAccountMonthlyChangesLazyQuery>;
export type GetAccountMonthlyChangesSuspenseQueryHookResult = ReturnType<typeof useGetAccountMonthlyChangesSuspenseQuery>;
export type GetAccountMonthlyChangesQueryResult = Apollo.QueryResult<GetAccountMonthlyChangesQuery, GetAccountMonthlyChangesQueryVariables>;
export const GetCategoryMonthlyBalanceDocument = gql`
    query getCategoryMonthlyBalance($input: GetMonthlyAmountInput!) {
  getCategoryMonthlyBalance(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useGetCategoryMonthlyBalanceQuery__
 *
 * To run a query within a React component, call `useGetCategoryMonthlyBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryMonthlyBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryMonthlyBalanceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCategoryMonthlyBalanceQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryMonthlyBalanceQuery, GetCategoryMonthlyBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryMonthlyBalanceQuery, GetCategoryMonthlyBalanceQueryVariables>(GetCategoryMonthlyBalanceDocument, options);
      }
export function useGetCategoryMonthlyBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryMonthlyBalanceQuery, GetCategoryMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryMonthlyBalanceQuery, GetCategoryMonthlyBalanceQueryVariables>(GetCategoryMonthlyBalanceDocument, options);
        }
export function useGetCategoryMonthlyBalanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryMonthlyBalanceQuery, GetCategoryMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryMonthlyBalanceQuery, GetCategoryMonthlyBalanceQueryVariables>(GetCategoryMonthlyBalanceDocument, options);
        }
export type GetCategoryMonthlyBalanceQueryHookResult = ReturnType<typeof useGetCategoryMonthlyBalanceQuery>;
export type GetCategoryMonthlyBalanceLazyQueryHookResult = ReturnType<typeof useGetCategoryMonthlyBalanceLazyQuery>;
export type GetCategoryMonthlyBalanceSuspenseQueryHookResult = ReturnType<typeof useGetCategoryMonthlyBalanceSuspenseQuery>;
export type GetCategoryMonthlyBalanceQueryResult = Apollo.QueryResult<GetCategoryMonthlyBalanceQuery, GetCategoryMonthlyBalanceQueryVariables>;
export const GetCategoryMonthlyChangesDocument = gql`
    query getCategoryMonthlyChanges($input: GetMonthlyAmountInput!) {
  getCategoryMonthlyChanges(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useGetCategoryMonthlyChangesQuery__
 *
 * To run a query within a React component, call `useGetCategoryMonthlyChangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryMonthlyChangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryMonthlyChangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCategoryMonthlyChangesQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryMonthlyChangesQuery, GetCategoryMonthlyChangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryMonthlyChangesQuery, GetCategoryMonthlyChangesQueryVariables>(GetCategoryMonthlyChangesDocument, options);
      }
export function useGetCategoryMonthlyChangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryMonthlyChangesQuery, GetCategoryMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryMonthlyChangesQuery, GetCategoryMonthlyChangesQueryVariables>(GetCategoryMonthlyChangesDocument, options);
        }
export function useGetCategoryMonthlyChangesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryMonthlyChangesQuery, GetCategoryMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryMonthlyChangesQuery, GetCategoryMonthlyChangesQueryVariables>(GetCategoryMonthlyChangesDocument, options);
        }
export type GetCategoryMonthlyChangesQueryHookResult = ReturnType<typeof useGetCategoryMonthlyChangesQuery>;
export type GetCategoryMonthlyChangesLazyQueryHookResult = ReturnType<typeof useGetCategoryMonthlyChangesLazyQuery>;
export type GetCategoryMonthlyChangesSuspenseQueryHookResult = ReturnType<typeof useGetCategoryMonthlyChangesSuspenseQuery>;
export type GetCategoryMonthlyChangesQueryResult = Apollo.QueryResult<GetCategoryMonthlyChangesQuery, GetCategoryMonthlyChangesQueryVariables>;
export const GetCategoryTypeMonthlyBalanceDocument = gql`
    query getCategoryTypeMonthlyBalance($input: GetMonthlyAmountInput!) {
  getCategoryTypeMonthlyBalance(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useGetCategoryTypeMonthlyBalanceQuery__
 *
 * To run a query within a React component, call `useGetCategoryTypeMonthlyBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryTypeMonthlyBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryTypeMonthlyBalanceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCategoryTypeMonthlyBalanceQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryTypeMonthlyBalanceQuery, GetCategoryTypeMonthlyBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryTypeMonthlyBalanceQuery, GetCategoryTypeMonthlyBalanceQueryVariables>(GetCategoryTypeMonthlyBalanceDocument, options);
      }
export function useGetCategoryTypeMonthlyBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryTypeMonthlyBalanceQuery, GetCategoryTypeMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryTypeMonthlyBalanceQuery, GetCategoryTypeMonthlyBalanceQueryVariables>(GetCategoryTypeMonthlyBalanceDocument, options);
        }
export function useGetCategoryTypeMonthlyBalanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryTypeMonthlyBalanceQuery, GetCategoryTypeMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryTypeMonthlyBalanceQuery, GetCategoryTypeMonthlyBalanceQueryVariables>(GetCategoryTypeMonthlyBalanceDocument, options);
        }
export type GetCategoryTypeMonthlyBalanceQueryHookResult = ReturnType<typeof useGetCategoryTypeMonthlyBalanceQuery>;
export type GetCategoryTypeMonthlyBalanceLazyQueryHookResult = ReturnType<typeof useGetCategoryTypeMonthlyBalanceLazyQuery>;
export type GetCategoryTypeMonthlyBalanceSuspenseQueryHookResult = ReturnType<typeof useGetCategoryTypeMonthlyBalanceSuspenseQuery>;
export type GetCategoryTypeMonthlyBalanceQueryResult = Apollo.QueryResult<GetCategoryTypeMonthlyBalanceQuery, GetCategoryTypeMonthlyBalanceQueryVariables>;
export const GetCategoryTypeMonthlyChangesDocument = gql`
    query getCategoryTypeMonthlyChanges($input: GetMonthlyAmountInput!) {
  getCategoryTypeMonthlyChanges(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useGetCategoryTypeMonthlyChangesQuery__
 *
 * To run a query within a React component, call `useGetCategoryTypeMonthlyChangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryTypeMonthlyChangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryTypeMonthlyChangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCategoryTypeMonthlyChangesQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryTypeMonthlyChangesQuery, GetCategoryTypeMonthlyChangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryTypeMonthlyChangesQuery, GetCategoryTypeMonthlyChangesQueryVariables>(GetCategoryTypeMonthlyChangesDocument, options);
      }
export function useGetCategoryTypeMonthlyChangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryTypeMonthlyChangesQuery, GetCategoryTypeMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryTypeMonthlyChangesQuery, GetCategoryTypeMonthlyChangesQueryVariables>(GetCategoryTypeMonthlyChangesDocument, options);
        }
export function useGetCategoryTypeMonthlyChangesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryTypeMonthlyChangesQuery, GetCategoryTypeMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryTypeMonthlyChangesQuery, GetCategoryTypeMonthlyChangesQueryVariables>(GetCategoryTypeMonthlyChangesDocument, options);
        }
export type GetCategoryTypeMonthlyChangesQueryHookResult = ReturnType<typeof useGetCategoryTypeMonthlyChangesQuery>;
export type GetCategoryTypeMonthlyChangesLazyQueryHookResult = ReturnType<typeof useGetCategoryTypeMonthlyChangesLazyQuery>;
export type GetCategoryTypeMonthlyChangesSuspenseQueryHookResult = ReturnType<typeof useGetCategoryTypeMonthlyChangesSuspenseQuery>;
export type GetCategoryTypeMonthlyChangesQueryResult = Apollo.QueryResult<GetCategoryTypeMonthlyChangesQuery, GetCategoryTypeMonthlyChangesQueryVariables>;
export const GetUniqueYearsDocument = gql`
    query getUniqueYears($input: GetUniqueYearsInput!) {
  getUniqueYears(input: $input)
}
    `;

/**
 * __useGetUniqueYearsQuery__
 *
 * To run a query within a React component, call `useGetUniqueYearsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniqueYearsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniqueYearsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUniqueYearsQuery(baseOptions: Apollo.QueryHookOptions<GetUniqueYearsQuery, GetUniqueYearsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUniqueYearsQuery, GetUniqueYearsQueryVariables>(GetUniqueYearsDocument, options);
      }
export function useGetUniqueYearsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUniqueYearsQuery, GetUniqueYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUniqueYearsQuery, GetUniqueYearsQueryVariables>(GetUniqueYearsDocument, options);
        }
export function useGetUniqueYearsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUniqueYearsQuery, GetUniqueYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUniqueYearsQuery, GetUniqueYearsQueryVariables>(GetUniqueYearsDocument, options);
        }
export type GetUniqueYearsQueryHookResult = ReturnType<typeof useGetUniqueYearsQuery>;
export type GetUniqueYearsLazyQueryHookResult = ReturnType<typeof useGetUniqueYearsLazyQuery>;
export type GetUniqueYearsSuspenseQueryHookResult = ReturnType<typeof useGetUniqueYearsSuspenseQuery>;
export type GetUniqueYearsQueryResult = Apollo.QueryResult<GetUniqueYearsQuery, GetUniqueYearsQueryVariables>;
export const GetTagDocument = gql`
    query getTag($input: GetTagInput!) {
  getTag(input: $input) {
    id
    name
    treasuryBookId
    createdAt
    updatedAt
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
    treasuryBookId
    createdAt
    updatedAt
  }
  getTransactions(input: $getTransactionsInput) {
    id
    accrualDate
    note
    tags {
      id
      name
    }
    treasuryBookId
    status
    createdAt
    updatedAt
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
    treasuryBookId
    createdAt
    updatedAt
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
    treasuryBookId
    createdAt
    updatedAt
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
    createdAt
    updatedAt
    treasuryBookId
  }
  getEntries(input: $getEntriesInput) {
    id
    treasuryBookId
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
    treasuryBookId
    status
    createdAt
    updatedAt
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
export const GetTreasuryBooksDocument = gql`
    query getTreasuryBooks($input: GetTreasuryBooksInput!) {
  getTreasuryBooks(input: $input) {
    id
    name
    currency
    ownerId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTreasuryBooksQuery__
 *
 * To run a query within a React component, call `useGetTreasuryBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTreasuryBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTreasuryBooksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTreasuryBooksQuery(baseOptions: Apollo.QueryHookOptions<GetTreasuryBooksQuery, GetTreasuryBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTreasuryBooksQuery, GetTreasuryBooksQueryVariables>(GetTreasuryBooksDocument, options);
      }
export function useGetTreasuryBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTreasuryBooksQuery, GetTreasuryBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTreasuryBooksQuery, GetTreasuryBooksQueryVariables>(GetTreasuryBooksDocument, options);
        }
export function useGetTreasuryBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTreasuryBooksQuery, GetTreasuryBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTreasuryBooksQuery, GetTreasuryBooksQueryVariables>(GetTreasuryBooksDocument, options);
        }
export type GetTreasuryBooksQueryHookResult = ReturnType<typeof useGetTreasuryBooksQuery>;
export type GetTreasuryBooksLazyQueryHookResult = ReturnType<typeof useGetTreasuryBooksLazyQuery>;
export type GetTreasuryBooksSuspenseQueryHookResult = ReturnType<typeof useGetTreasuryBooksSuspenseQuery>;
export type GetTreasuryBooksQueryResult = Apollo.QueryResult<GetTreasuryBooksQuery, GetTreasuryBooksQueryVariables>;