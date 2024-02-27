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
  entryCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  treasuryBookId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AccountInput = {
  id: Scalars['String']['input'];
};

export type AccountsInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  treasuryBookId: Scalars['String']['input'];
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

export type AddExchangeInput = {
  accrualDate: Scalars['DateTime']['input'];
  destination: AddExchangeTransactionInput;
  note: Scalars['String']['input'];
  origin: AddExchangeTransactionInput;
  ownerId: Scalars['String']['input'];
};

export type AddExchangeTransactionInput = {
  entries: Array<AddEntryInput>;
  treasuryBookId: Scalars['String']['input'];
};

export type AddTagInput = {
  name: Scalars['String']['input'];
  treasuryBookId: Scalars['String']['input'];
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

export type CategoriesInput = {
  treasuryBookId: Scalars['String']['input'];
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

export type CategoryInput = {
  id: Scalars['String']['input'];
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
export type EntriesInput = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  categoryType?: InputMaybe<Scalars['String']['input']>;
  exchangeId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EntryStatus>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  treasuryBookId?: InputMaybe<Scalars['String']['input']>;
};

export type Entry = {
  __typename?: 'Entry';
  account?: Maybe<Account>;
  createdAt: Scalars['DateTime']['output'];
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
export type Exchange = {
  __typename?: 'Exchange';
  createdAt: Scalars['DateTime']['output'];
  destination: Transaction;
  id: Scalars['String']['output'];
  origin: Transaction;
  ownerId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExchangeInput = {
  id: Scalars['String']['input'];
};

export type ExchangesInput = {
  ownerId: Scalars['String']['input'];
};

export type MonthlyAmount = {
  __typename?: 'MonthlyAmount';
  amounts: Array<AmountOnMonth>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type MonthlyAmountInput = {
  status?: InputMaybe<EntryStatus>;
  treasuryBookId: Scalars['String']['input'];
  type: DateType;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Account;
  addCategory: Category;
  addExchange: Exchange;
  addTag: Tag;
  addTransaction: Transaction;
  addTreasuryBook: TreasuryBook;
  updateAccount: Account;
  updateCategory: Category;
  updateTag: Tag;
  updateTransaction: Transaction;
  updateTreasuryBook: TreasuryBook;
};


export type MutationAddAccountArgs = {
  input: AddAccountInput;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddExchangeArgs = {
  input: AddExchangeInput;
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


export type MutationUpdateTreasuryBookArgs = {
  input: UpdateTreasuryBookInput;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accountMonthlyBalance: Array<MonthlyAmount>;
  accountMonthlyChanges: Array<MonthlyAmount>;
  accounts: Array<Account>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  categoryMonthlyBalance: Array<MonthlyAmount>;
  categoryMonthlyChanges: Array<MonthlyAmount>;
  categoryTypeMonthlyBalance: Array<MonthlyAmount>;
  categoryTypeMonthlyChanges: Array<MonthlyAmount>;
  entries: Array<Entry>;
  exchange?: Maybe<Exchange>;
  exchanges: Array<Exchange>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  treasuryBooks: Array<TreasuryBook>;
  uniqueYears: Array<Scalars['Int']['output']>;
};


export type QueryAccountArgs = {
  input: AccountInput;
};


export type QueryAccountMonthlyBalanceArgs = {
  input: MonthlyAmountInput;
};


export type QueryAccountMonthlyChangesArgs = {
  input: MonthlyAmountInput;
};


export type QueryAccountsArgs = {
  input: AccountsInput;
};


export type QueryCategoriesArgs = {
  input: CategoriesInput;
};


export type QueryCategoryArgs = {
  input: CategoryInput;
};


export type QueryCategoryMonthlyBalanceArgs = {
  input: MonthlyAmountInput;
};


export type QueryCategoryMonthlyChangesArgs = {
  input: MonthlyAmountInput;
};


export type QueryCategoryTypeMonthlyBalanceArgs = {
  input: MonthlyAmountInput;
};


export type QueryCategoryTypeMonthlyChangesArgs = {
  input: MonthlyAmountInput;
};


export type QueryEntriesArgs = {
  input: EntriesInput;
};


export type QueryExchangeArgs = {
  input: ExchangeInput;
};


export type QueryExchangesArgs = {
  input: ExchangesInput;
};


export type QueryTagArgs = {
  input: TagInput;
};


export type QueryTagsArgs = {
  input: TagsInput;
};


export type QueryTransactionArgs = {
  input: TransactionInput;
};


export type QueryTransactionsArgs = {
  input: TransactionsInput;
};


export type QueryTreasuryBooksArgs = {
  input: TreasuryBooksInput;
};


export type QueryUniqueYearsArgs = {
  input: UniqueYearsInput;
};

export type Tag = {
  __typename?: 'Tag';
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  treasuryBookId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TagInput = {
  id: Scalars['String']['input'];
};

export const TagType = {
  ARAP: 'ARAP',
  CUSTOM: 'CUSTOM',
  DEPRECIATION: 'DEPRECIATION',
  PREPAID: 'PREPAID'
} as const;

export type TagType = typeof TagType[keyof typeof TagType];
export type TagsInput = {
  treasuryBookId: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accrualDate: Scalars['DateTime']['output'];
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
  status?: Maybe<EntryStatus>;
  tags?: Maybe<Array<Tag>>;
  treasuryBookId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TransactionInput = {
  id: Scalars['String']['input'];
};

export type TransactionsInput = {
  status?: InputMaybe<EntryStatus>;
  tagId?: InputMaybe<Scalars['String']['input']>;
  treasuryBookId?: InputMaybe<Scalars['String']['input']>;
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

export type TreasuryBooksInput = {
  currency?: InputMaybe<Currency>;
  ownerId: Scalars['String']['input'];
};

export type UniqueYearsInput = {
  treasuryBookId: Scalars['String']['input'];
  type: DateType;
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

export type UpdateTreasuryBookInput = {
  currency: Currency;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
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
  AccountInput: AccountInput;
  AccountsInput: AccountsInput;
  AddAccountInput: AddAccountInput;
  AddCategoryInput: AddCategoryInput;
  AddEntryInput: AddEntryInput;
  AddExchangeInput: AddExchangeInput;
  AddExchangeTransactionInput: AddExchangeTransactionInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  AddTreasuryBookInput: AddTreasuryBookInput;
  Amount: ResolverTypeWrapper<Amount>;
  AmountOnMonth: ResolverTypeWrapper<AmountOnMonth>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CategoriesInput: CategoriesInput;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  CategoryType: CategoryType;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateType: DateType;
  EntriesInput: EntriesInput;
  Entry: ResolverTypeWrapper<Entry>;
  EntryStatus: EntryStatus;
  Exchange: ResolverTypeWrapper<Exchange>;
  ExchangeInput: ExchangeInput;
  ExchangesInput: ExchangesInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MonthlyAmount: ResolverTypeWrapper<MonthlyAmount>;
  MonthlyAmountInput: MonthlyAmountInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagInput: TagInput;
  TagType: TagType;
  TagsInput: TagsInput;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionInput: TransactionInput;
  TransactionsInput: TransactionsInput;
  TreasuryBook: ResolverTypeWrapper<TreasuryBook>;
  TreasuryBooksInput: TreasuryBooksInput;
  UniqueYearsInput: UniqueYearsInput;
  UpdateAccountInput: UpdateAccountInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
  UpdateTreasuryBookInput: UpdateTreasuryBookInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AccountInput: AccountInput;
  AccountsInput: AccountsInput;
  AddAccountInput: AddAccountInput;
  AddCategoryInput: AddCategoryInput;
  AddEntryInput: AddEntryInput;
  AddExchangeInput: AddExchangeInput;
  AddExchangeTransactionInput: AddExchangeTransactionInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  AddTreasuryBookInput: AddTreasuryBookInput;
  Amount: Amount;
  AmountOnMonth: AmountOnMonth;
  Boolean: Scalars['Boolean']['output'];
  CategoriesInput: CategoriesInput;
  Category: Category;
  CategoryInput: CategoryInput;
  DateTime: Scalars['DateTime']['output'];
  EntriesInput: EntriesInput;
  Entry: Entry;
  Exchange: Exchange;
  ExchangeInput: ExchangeInput;
  ExchangesInput: ExchangesInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  MonthlyAmount: MonthlyAmount;
  MonthlyAmountInput: MonthlyAmountInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  TagInput: TagInput;
  TagsInput: TagsInput;
  Transaction: Transaction;
  TransactionInput: TransactionInput;
  TransactionsInput: TransactionsInput;
  TreasuryBook: TreasuryBook;
  TreasuryBooksInput: TreasuryBooksInput;
  UniqueYearsInput: UniqueYearsInput;
  UpdateAccountInput: UpdateAccountInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
  UpdateTreasuryBookInput: UpdateTreasuryBookInput;
};

export type AccountResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  entryCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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

export type ExchangeResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Exchange'] = ResolversParentTypes['Exchange']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  destination?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
  addExchange?: Resolver<ResolversTypes['Exchange'], ParentType, ContextType, RequireFields<MutationAddExchangeArgs, 'input'>>;
  addTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationAddTagArgs, 'input'>>;
  addTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationAddTransactionArgs, 'input'>>;
  addTreasuryBook?: Resolver<ResolversTypes['TreasuryBook'], ParentType, ContextType, RequireFields<MutationAddTreasuryBookArgs, 'input'>>;
  updateAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'input'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'input'>>;
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'input'>>;
  updateTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationUpdateTransactionArgs, 'input'>>;
  updateTreasuryBook?: Resolver<ResolversTypes['TreasuryBook'], ParentType, ContextType, RequireFields<MutationUpdateTreasuryBookArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'input'>>;
  accountMonthlyBalance?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryAccountMonthlyBalanceArgs, 'input'>>;
  accountMonthlyChanges?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryAccountMonthlyChangesArgs, 'input'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountsArgs, 'input'>>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoriesArgs, 'input'>>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'input'>>;
  categoryMonthlyBalance?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryCategoryMonthlyBalanceArgs, 'input'>>;
  categoryMonthlyChanges?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryCategoryMonthlyChangesArgs, 'input'>>;
  categoryTypeMonthlyBalance?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryCategoryTypeMonthlyBalanceArgs, 'input'>>;
  categoryTypeMonthlyChanges?: Resolver<Array<ResolversTypes['MonthlyAmount']>, ParentType, ContextType, RequireFields<QueryCategoryTypeMonthlyChangesArgs, 'input'>>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryEntriesArgs, 'input'>>;
  exchange?: Resolver<Maybe<ResolversTypes['Exchange']>, ParentType, ContextType, RequireFields<QueryExchangeArgs, 'input'>>;
  exchanges?: Resolver<Array<ResolversTypes['Exchange']>, ParentType, ContextType, RequireFields<QueryExchangesArgs, 'input'>>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagArgs, 'input'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'input'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'input'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'input'>>;
  treasuryBooks?: Resolver<Array<ResolversTypes['TreasuryBook']>, ParentType, ContextType, RequireFields<QueryTreasuryBooksArgs, 'input'>>;
  uniqueYears?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryUniqueYearsArgs, 'input'>>;
};

export type TagResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  treasuryBookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  accrualDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['EntryStatus']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
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
  Exchange?: ExchangeResolvers<ContextType>;
  MonthlyAmount?: MonthlyAmountResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TreasuryBook?: TreasuryBookResolvers<ContextType>;
};


export type AccountDataFragment = { __typename?: 'Account', id: string, name: string, entryCount?: number | null, createdAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null };

export type CategoryDataFragment = { __typename?: 'Category', id: string, name: string, type: CategoryType, createdAt: Date };

export type EntryDataFragment = { __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, createdAt: Date, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null };

export type ExchangeDataFragment = { __typename?: 'Exchange', id: string, ownerId: string, createdAt: Date, origin: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string }, destination: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string } };

export type MonthlyAmountDataFragment = { __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> };

export type TagDataFragment = { __typename?: 'Tag', id: string, name: string, createdAt: Date, count: number };

export type TransactionDataFragment = { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string };

export type TreasuryBookDataFragment = { __typename?: 'TreasuryBook', id: string, name: string, currency: Currency, createdAt: Date };

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

export type AddExchangeMutationVariables = Exact<{
  input: AddExchangeInput;
}>;


export type AddExchangeMutation = { __typename?: 'Mutation', addExchange: { __typename?: 'Exchange', id: string, ownerId: string, origin: { __typename?: 'Transaction', id: string }, destination: { __typename?: 'Transaction', id: string } } };

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


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string } };

export type UpdateTransactionMutationVariables = Exact<{
  input: UpdateTransactionInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string } };

export type AddTreasuryBookMutationVariables = Exact<{
  input: AddTreasuryBookInput;
}>;


export type AddTreasuryBookMutation = { __typename?: 'Mutation', addTreasuryBook: { __typename?: 'TreasuryBook', id: string, name: string, currency: Currency, createdAt: Date } };

export type UpdateTreasuryBookMutationVariables = Exact<{
  input: UpdateTreasuryBookInput;
}>;


export type UpdateTreasuryBookMutation = { __typename?: 'Mutation', updateTreasuryBook: { __typename?: 'TreasuryBook', id: string, name: string, currency: Currency, createdAt: Date } };

export type AccountQueryVariables = Exact<{
  input: AccountInput;
}>;


export type AccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: string, name: string, createdAt: Date, updatedAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null } | null };

export type AccountDetailQueryVariables = Exact<{
  accountInput: AccountInput;
  entriesInput: EntriesInput;
}>;


export type AccountDetailQuery = { __typename?: 'Query', account?: { __typename?: 'Account', updatedAt: Date, id: string, name: string, entryCount?: number | null, createdAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null } | null, entries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, createdAt: Date, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type AccountsQueryVariables = Exact<{
  input: AccountsInput;
}>;


export type AccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string, name: string, entryCount?: number | null, createdAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null }> };

export type CategoriesQueryVariables = Exact<{
  input: CategoriesInput;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', accountCount?: number | null, id: string, name: string, type: CategoryType, createdAt: Date }> };

export type CategoryQueryVariables = Exact<{
  input: CategoryInput;
}>;


export type CategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', updatedAt: Date, id: string, name: string, type: CategoryType, createdAt: Date } | null };

export type CategoryDetailQueryVariables = Exact<{
  categoryInput: CategoryInput;
  accountsInput: AccountsInput;
  entriesInput: EntriesInput;
}>;


export type CategoryDetailQuery = { __typename?: 'Query', category?: { __typename?: 'Category', updatedAt: Date, id: string, name: string, type: CategoryType, createdAt: Date } | null, accounts: Array<{ __typename?: 'Account', id: string, name: string, entryCount?: number | null, createdAt: Date, category?: { __typename?: 'Category', id: string, name: string } | null }>, entries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, createdAt: Date, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type EntriesQueryVariables = Exact<{
  input: EntriesInput;
}>;


export type EntriesQuery = { __typename?: 'Query', entries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, createdAt: Date, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type ExchangeDetailsQueryVariables = Exact<{
  exchangeInput: ExchangeInput;
  entriesInput: EntriesInput;
}>;


export type ExchangeDetailsQuery = { __typename?: 'Query', exchange?: { __typename?: 'Exchange', updatedAt: Date, id: string, ownerId: string, createdAt: Date, origin: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string }, destination: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string } } | null, entries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, createdAt: Date, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type ExchangesQueryVariables = Exact<{
  input: ExchangesInput;
}>;


export type ExchangesQuery = { __typename?: 'Query', exchanges: Array<{ __typename?: 'Exchange', id: string, ownerId: string, createdAt: Date, origin: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string }, destination: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string } }> };

export type AccountMonthlyBalanceQueryVariables = Exact<{
  input: MonthlyAmountInput;
}>;


export type AccountMonthlyBalanceQuery = { __typename?: 'Query', accountMonthlyBalance: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type AccountMonthlyChangesQueryVariables = Exact<{
  input: MonthlyAmountInput;
}>;


export type AccountMonthlyChangesQuery = { __typename?: 'Query', accountMonthlyChanges: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type CategoryMonthlyBalanceQueryVariables = Exact<{
  input: MonthlyAmountInput;
}>;


export type CategoryMonthlyBalanceQuery = { __typename?: 'Query', categoryMonthlyBalance: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type CategoryMonthlyChangesQueryVariables = Exact<{
  input: MonthlyAmountInput;
}>;


export type CategoryMonthlyChangesQuery = { __typename?: 'Query', categoryMonthlyChanges: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type CategoryTypeMonthlyBalanceQueryVariables = Exact<{
  input: MonthlyAmountInput;
}>;


export type CategoryTypeMonthlyBalanceQuery = { __typename?: 'Query', categoryTypeMonthlyBalance: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type CategoryTypeMonthlyChangesQueryVariables = Exact<{
  input: MonthlyAmountInput;
}>;


export type CategoryTypeMonthlyChangesQuery = { __typename?: 'Query', categoryTypeMonthlyChanges: Array<{ __typename?: 'MonthlyAmount', id: string, name: string, amounts: Array<{ __typename?: 'AmountOnMonth', month: number, amount: { __typename?: 'Amount', debit: number, credit: number } }> }> };

export type UniqueYearsQueryVariables = Exact<{
  input: UniqueYearsInput;
}>;


export type UniqueYearsQuery = { __typename?: 'Query', uniqueYears: Array<number> };

export type TagQueryVariables = Exact<{
  input: TagInput;
}>;


export type TagQuery = { __typename?: 'Query', tag?: { __typename?: 'Tag', id: string, name: string, createdAt: Date, count: number } | null };

export type TagDetailsQueryVariables = Exact<{
  tagInput: TagInput;
  transactionsInput: TransactionsInput;
}>;


export type TagDetailsQuery = { __typename?: 'Query', tag?: { __typename?: 'Tag', updatedAt: Date, id: string, name: string, createdAt: Date, count: number } | null, transactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string }> };

export type TagsQueryVariables = Exact<{
  input: TagsInput;
}>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, createdAt: Date, count: number }> };

export type TransactionDetailsQueryVariables = Exact<{
  TransactionInput: TransactionInput;
  entriesInput: EntriesInput;
}>;


export type TransactionDetailsQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', updatedAt: Date, id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | null, entries: Array<{ __typename?: 'Entry', id: string, treasuryBookId: string, transactionDate: Date, debit: number, credit: number, memo: string, status: EntryStatus, transactionId: string, createdAt: Date, account?: { __typename?: 'Account', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, type: CategoryType } | null } | null }> };

export type TransactionsQueryVariables = Exact<{
  input: TransactionsInput;
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string }> };

export type TreasuryBooksQueryVariables = Exact<{
  input: TreasuryBooksInput;
}>;


export type TreasuryBooksQuery = { __typename?: 'Query', treasuryBooks: Array<{ __typename?: 'TreasuryBook', updatedAt: Date, id: string, name: string, currency: Currency, createdAt: Date }> };

export const AccountDataFragmentDoc = gql`
    fragment AccountData on Account {
  id
  category {
    id
    name
  }
  name
  entryCount
  createdAt
}
    `;
export const CategoryDataFragmentDoc = gql`
    fragment CategoryData on Category {
  id
  name
  type
  createdAt
}
    `;
export const EntryDataFragmentDoc = gql`
    fragment EntryData on Entry {
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
  createdAt
}
    `;
export const TransactionDataFragmentDoc = gql`
    fragment TransactionData on Transaction {
  id
  accrualDate
  note
  status
  amount
  createdAt
  treasuryBookId
}
    `;
export const ExchangeDataFragmentDoc = gql`
    fragment ExchangeData on Exchange {
  id
  ownerId
  origin {
    ...TransactionData
  }
  destination {
    ...TransactionData
  }
  createdAt
}
    ${TransactionDataFragmentDoc}`;
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
export const TagDataFragmentDoc = gql`
    fragment TagData on Tag {
  id
  name
  createdAt
  count
}
    `;
export const TreasuryBookDataFragmentDoc = gql`
    fragment TreasuryBookData on TreasuryBook {
  id
  name
  currency
  createdAt
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
export const AddExchangeDocument = gql`
    mutation addExchange($input: AddExchangeInput!) {
  addExchange(input: $input) {
    id
    ownerId
    origin {
      id
    }
    destination {
      id
    }
  }
}
    `;
export type AddExchangeMutationFn = Apollo.MutationFunction<AddExchangeMutation, AddExchangeMutationVariables>;

/**
 * __useAddExchangeMutation__
 *
 * To run a mutation, you first call `useAddExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExchangeMutation, { data, loading, error }] = useAddExchangeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddExchangeMutation(baseOptions?: Apollo.MutationHookOptions<AddExchangeMutation, AddExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExchangeMutation, AddExchangeMutationVariables>(AddExchangeDocument, options);
      }
export type AddExchangeMutationHookResult = ReturnType<typeof useAddExchangeMutation>;
export type AddExchangeMutationResult = Apollo.MutationResult<AddExchangeMutation>;
export type AddExchangeMutationOptions = Apollo.BaseMutationOptions<AddExchangeMutation, AddExchangeMutationVariables>;
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
    ...TransactionData
  }
}
    ${TransactionDataFragmentDoc}`;
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
    ...TransactionData
  }
}
    ${TransactionDataFragmentDoc}`;
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
    ...TreasuryBookData
  }
}
    ${TreasuryBookDataFragmentDoc}`;
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
export const UpdateTreasuryBookDocument = gql`
    mutation updateTreasuryBook($input: UpdateTreasuryBookInput!) {
  updateTreasuryBook(input: $input) {
    ...TreasuryBookData
  }
}
    ${TreasuryBookDataFragmentDoc}`;
export type UpdateTreasuryBookMutationFn = Apollo.MutationFunction<UpdateTreasuryBookMutation, UpdateTreasuryBookMutationVariables>;

/**
 * __useUpdateTreasuryBookMutation__
 *
 * To run a mutation, you first call `useUpdateTreasuryBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTreasuryBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTreasuryBookMutation, { data, loading, error }] = useUpdateTreasuryBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTreasuryBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTreasuryBookMutation, UpdateTreasuryBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTreasuryBookMutation, UpdateTreasuryBookMutationVariables>(UpdateTreasuryBookDocument, options);
      }
export type UpdateTreasuryBookMutationHookResult = ReturnType<typeof useUpdateTreasuryBookMutation>;
export type UpdateTreasuryBookMutationResult = Apollo.MutationResult<UpdateTreasuryBookMutation>;
export type UpdateTreasuryBookMutationOptions = Apollo.BaseMutationOptions<UpdateTreasuryBookMutation, UpdateTreasuryBookMutationVariables>;
export const AccountDocument = gql`
    query Account($input: AccountInput!) {
  account(input: $input) {
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
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountQuery(baseOptions: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export function useAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountSuspenseQueryHookResult = ReturnType<typeof useAccountSuspenseQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
export const AccountDetailDocument = gql`
    query AccountDetail($accountInput: AccountInput!, $entriesInput: EntriesInput!) {
  account(input: $accountInput) {
    ...AccountData
    updatedAt
  }
  entries(input: $entriesInput) {
    ...EntryData
  }
}
    ${AccountDataFragmentDoc}
${EntryDataFragmentDoc}`;

/**
 * __useAccountDetailQuery__
 *
 * To run a query within a React component, call `useAccountDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountDetailQuery({
 *   variables: {
 *      accountInput: // value for 'accountInput'
 *      entriesInput: // value for 'entriesInput'
 *   },
 * });
 */
export function useAccountDetailQuery(baseOptions: Apollo.QueryHookOptions<AccountDetailQuery, AccountDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountDetailQuery, AccountDetailQueryVariables>(AccountDetailDocument, options);
      }
export function useAccountDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountDetailQuery, AccountDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountDetailQuery, AccountDetailQueryVariables>(AccountDetailDocument, options);
        }
export function useAccountDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountDetailQuery, AccountDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountDetailQuery, AccountDetailQueryVariables>(AccountDetailDocument, options);
        }
export type AccountDetailQueryHookResult = ReturnType<typeof useAccountDetailQuery>;
export type AccountDetailLazyQueryHookResult = ReturnType<typeof useAccountDetailLazyQuery>;
export type AccountDetailSuspenseQueryHookResult = ReturnType<typeof useAccountDetailSuspenseQuery>;
export type AccountDetailQueryResult = Apollo.QueryResult<AccountDetailQuery, AccountDetailQueryVariables>;
export const AccountsDocument = gql`
    query Accounts($input: AccountsInput!) {
  accounts(input: $input) {
    ...AccountData
  }
}
    ${AccountDataFragmentDoc}`;

/**
 * __useAccountsQuery__
 *
 * To run a query within a React component, call `useAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountsQuery(baseOptions: Apollo.QueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, options);
      }
export function useAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, options);
        }
export function useAccountsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, options);
        }
export type AccountsQueryHookResult = ReturnType<typeof useAccountsQuery>;
export type AccountsLazyQueryHookResult = ReturnType<typeof useAccountsLazyQuery>;
export type AccountsSuspenseQueryHookResult = ReturnType<typeof useAccountsSuspenseQuery>;
export type AccountsQueryResult = Apollo.QueryResult<AccountsQuery, AccountsQueryVariables>;
export const CategoriesDocument = gql`
    query Categories($input: CategoriesInput!) {
  categories(input: $input) {
    ...CategoryData
    accountCount
  }
}
    ${CategoryDataFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export function useCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesSuspenseQueryHookResult = ReturnType<typeof useCategoriesSuspenseQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDocument = gql`
    query Category($input: CategoryInput!) {
  category(input: $input) {
    ...CategoryData
    updatedAt
  }
}
    ${CategoryDataFragmentDoc}`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export function useCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategorySuspenseQueryHookResult = ReturnType<typeof useCategorySuspenseQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const CategoryDetailDocument = gql`
    query CategoryDetail($categoryInput: CategoryInput!, $accountsInput: AccountsInput!, $entriesInput: EntriesInput!) {
  category(input: $categoryInput) {
    ...CategoryData
    updatedAt
  }
  accounts(input: $accountsInput) {
    ...AccountData
  }
  entries(input: $entriesInput) {
    ...EntryData
  }
}
    ${CategoryDataFragmentDoc}
${AccountDataFragmentDoc}
${EntryDataFragmentDoc}`;

/**
 * __useCategoryDetailQuery__
 *
 * To run a query within a React component, call `useCategoryDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryDetailQuery({
 *   variables: {
 *      categoryInput: // value for 'categoryInput'
 *      accountsInput: // value for 'accountsInput'
 *      entriesInput: // value for 'entriesInput'
 *   },
 * });
 */
export function useCategoryDetailQuery(baseOptions: Apollo.QueryHookOptions<CategoryDetailQuery, CategoryDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryDetailQuery, CategoryDetailQueryVariables>(CategoryDetailDocument, options);
      }
export function useCategoryDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryDetailQuery, CategoryDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryDetailQuery, CategoryDetailQueryVariables>(CategoryDetailDocument, options);
        }
export function useCategoryDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryDetailQuery, CategoryDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryDetailQuery, CategoryDetailQueryVariables>(CategoryDetailDocument, options);
        }
export type CategoryDetailQueryHookResult = ReturnType<typeof useCategoryDetailQuery>;
export type CategoryDetailLazyQueryHookResult = ReturnType<typeof useCategoryDetailLazyQuery>;
export type CategoryDetailSuspenseQueryHookResult = ReturnType<typeof useCategoryDetailSuspenseQuery>;
export type CategoryDetailQueryResult = Apollo.QueryResult<CategoryDetailQuery, CategoryDetailQueryVariables>;
export const EntriesDocument = gql`
    query Entries($input: EntriesInput!) {
  entries(input: $input) {
    ...EntryData
  }
}
    ${EntryDataFragmentDoc}`;

/**
 * __useEntriesQuery__
 *
 * To run a query within a React component, call `useEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEntriesQuery(baseOptions: Apollo.QueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
      }
export function useEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
        }
export function useEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
        }
export type EntriesQueryHookResult = ReturnType<typeof useEntriesQuery>;
export type EntriesLazyQueryHookResult = ReturnType<typeof useEntriesLazyQuery>;
export type EntriesSuspenseQueryHookResult = ReturnType<typeof useEntriesSuspenseQuery>;
export type EntriesQueryResult = Apollo.QueryResult<EntriesQuery, EntriesQueryVariables>;
export const ExchangeDetailsDocument = gql`
    query ExchangeDetails($exchangeInput: ExchangeInput!, $entriesInput: EntriesInput!) {
  exchange(input: $exchangeInput) {
    ...ExchangeData
    updatedAt
  }
  entries(input: $entriesInput) {
    ...EntryData
  }
}
    ${ExchangeDataFragmentDoc}
${EntryDataFragmentDoc}`;

/**
 * __useExchangeDetailsQuery__
 *
 * To run a query within a React component, call `useExchangeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeDetailsQuery({
 *   variables: {
 *      exchangeInput: // value for 'exchangeInput'
 *      entriesInput: // value for 'entriesInput'
 *   },
 * });
 */
export function useExchangeDetailsQuery(baseOptions: Apollo.QueryHookOptions<ExchangeDetailsQuery, ExchangeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExchangeDetailsQuery, ExchangeDetailsQueryVariables>(ExchangeDetailsDocument, options);
      }
export function useExchangeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExchangeDetailsQuery, ExchangeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExchangeDetailsQuery, ExchangeDetailsQueryVariables>(ExchangeDetailsDocument, options);
        }
export function useExchangeDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExchangeDetailsQuery, ExchangeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExchangeDetailsQuery, ExchangeDetailsQueryVariables>(ExchangeDetailsDocument, options);
        }
export type ExchangeDetailsQueryHookResult = ReturnType<typeof useExchangeDetailsQuery>;
export type ExchangeDetailsLazyQueryHookResult = ReturnType<typeof useExchangeDetailsLazyQuery>;
export type ExchangeDetailsSuspenseQueryHookResult = ReturnType<typeof useExchangeDetailsSuspenseQuery>;
export type ExchangeDetailsQueryResult = Apollo.QueryResult<ExchangeDetailsQuery, ExchangeDetailsQueryVariables>;
export const ExchangesDocument = gql`
    query Exchanges($input: ExchangesInput!) {
  exchanges(input: $input) {
    ...ExchangeData
  }
}
    ${ExchangeDataFragmentDoc}`;

/**
 * __useExchangesQuery__
 *
 * To run a query within a React component, call `useExchangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExchangesQuery(baseOptions: Apollo.QueryHookOptions<ExchangesQuery, ExchangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExchangesQuery, ExchangesQueryVariables>(ExchangesDocument, options);
      }
export function useExchangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExchangesQuery, ExchangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExchangesQuery, ExchangesQueryVariables>(ExchangesDocument, options);
        }
export function useExchangesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExchangesQuery, ExchangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExchangesQuery, ExchangesQueryVariables>(ExchangesDocument, options);
        }
export type ExchangesQueryHookResult = ReturnType<typeof useExchangesQuery>;
export type ExchangesLazyQueryHookResult = ReturnType<typeof useExchangesLazyQuery>;
export type ExchangesSuspenseQueryHookResult = ReturnType<typeof useExchangesSuspenseQuery>;
export type ExchangesQueryResult = Apollo.QueryResult<ExchangesQuery, ExchangesQueryVariables>;
export const AccountMonthlyBalanceDocument = gql`
    query AccountMonthlyBalance($input: MonthlyAmountInput!) {
  accountMonthlyBalance(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useAccountMonthlyBalanceQuery__
 *
 * To run a query within a React component, call `useAccountMonthlyBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountMonthlyBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountMonthlyBalanceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountMonthlyBalanceQuery(baseOptions: Apollo.QueryHookOptions<AccountMonthlyBalanceQuery, AccountMonthlyBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountMonthlyBalanceQuery, AccountMonthlyBalanceQueryVariables>(AccountMonthlyBalanceDocument, options);
      }
export function useAccountMonthlyBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountMonthlyBalanceQuery, AccountMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountMonthlyBalanceQuery, AccountMonthlyBalanceQueryVariables>(AccountMonthlyBalanceDocument, options);
        }
export function useAccountMonthlyBalanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountMonthlyBalanceQuery, AccountMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountMonthlyBalanceQuery, AccountMonthlyBalanceQueryVariables>(AccountMonthlyBalanceDocument, options);
        }
export type AccountMonthlyBalanceQueryHookResult = ReturnType<typeof useAccountMonthlyBalanceQuery>;
export type AccountMonthlyBalanceLazyQueryHookResult = ReturnType<typeof useAccountMonthlyBalanceLazyQuery>;
export type AccountMonthlyBalanceSuspenseQueryHookResult = ReturnType<typeof useAccountMonthlyBalanceSuspenseQuery>;
export type AccountMonthlyBalanceQueryResult = Apollo.QueryResult<AccountMonthlyBalanceQuery, AccountMonthlyBalanceQueryVariables>;
export const AccountMonthlyChangesDocument = gql`
    query AccountMonthlyChanges($input: MonthlyAmountInput!) {
  accountMonthlyChanges(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useAccountMonthlyChangesQuery__
 *
 * To run a query within a React component, call `useAccountMonthlyChangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountMonthlyChangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountMonthlyChangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountMonthlyChangesQuery(baseOptions: Apollo.QueryHookOptions<AccountMonthlyChangesQuery, AccountMonthlyChangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountMonthlyChangesQuery, AccountMonthlyChangesQueryVariables>(AccountMonthlyChangesDocument, options);
      }
export function useAccountMonthlyChangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountMonthlyChangesQuery, AccountMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountMonthlyChangesQuery, AccountMonthlyChangesQueryVariables>(AccountMonthlyChangesDocument, options);
        }
export function useAccountMonthlyChangesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountMonthlyChangesQuery, AccountMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountMonthlyChangesQuery, AccountMonthlyChangesQueryVariables>(AccountMonthlyChangesDocument, options);
        }
export type AccountMonthlyChangesQueryHookResult = ReturnType<typeof useAccountMonthlyChangesQuery>;
export type AccountMonthlyChangesLazyQueryHookResult = ReturnType<typeof useAccountMonthlyChangesLazyQuery>;
export type AccountMonthlyChangesSuspenseQueryHookResult = ReturnType<typeof useAccountMonthlyChangesSuspenseQuery>;
export type AccountMonthlyChangesQueryResult = Apollo.QueryResult<AccountMonthlyChangesQuery, AccountMonthlyChangesQueryVariables>;
export const CategoryMonthlyBalanceDocument = gql`
    query CategoryMonthlyBalance($input: MonthlyAmountInput!) {
  categoryMonthlyBalance(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useCategoryMonthlyBalanceQuery__
 *
 * To run a query within a React component, call `useCategoryMonthlyBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryMonthlyBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryMonthlyBalanceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryMonthlyBalanceQuery(baseOptions: Apollo.QueryHookOptions<CategoryMonthlyBalanceQuery, CategoryMonthlyBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryMonthlyBalanceQuery, CategoryMonthlyBalanceQueryVariables>(CategoryMonthlyBalanceDocument, options);
      }
export function useCategoryMonthlyBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryMonthlyBalanceQuery, CategoryMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryMonthlyBalanceQuery, CategoryMonthlyBalanceQueryVariables>(CategoryMonthlyBalanceDocument, options);
        }
export function useCategoryMonthlyBalanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryMonthlyBalanceQuery, CategoryMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryMonthlyBalanceQuery, CategoryMonthlyBalanceQueryVariables>(CategoryMonthlyBalanceDocument, options);
        }
export type CategoryMonthlyBalanceQueryHookResult = ReturnType<typeof useCategoryMonthlyBalanceQuery>;
export type CategoryMonthlyBalanceLazyQueryHookResult = ReturnType<typeof useCategoryMonthlyBalanceLazyQuery>;
export type CategoryMonthlyBalanceSuspenseQueryHookResult = ReturnType<typeof useCategoryMonthlyBalanceSuspenseQuery>;
export type CategoryMonthlyBalanceQueryResult = Apollo.QueryResult<CategoryMonthlyBalanceQuery, CategoryMonthlyBalanceQueryVariables>;
export const CategoryMonthlyChangesDocument = gql`
    query CategoryMonthlyChanges($input: MonthlyAmountInput!) {
  categoryMonthlyChanges(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useCategoryMonthlyChangesQuery__
 *
 * To run a query within a React component, call `useCategoryMonthlyChangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryMonthlyChangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryMonthlyChangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryMonthlyChangesQuery(baseOptions: Apollo.QueryHookOptions<CategoryMonthlyChangesQuery, CategoryMonthlyChangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryMonthlyChangesQuery, CategoryMonthlyChangesQueryVariables>(CategoryMonthlyChangesDocument, options);
      }
export function useCategoryMonthlyChangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryMonthlyChangesQuery, CategoryMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryMonthlyChangesQuery, CategoryMonthlyChangesQueryVariables>(CategoryMonthlyChangesDocument, options);
        }
export function useCategoryMonthlyChangesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryMonthlyChangesQuery, CategoryMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryMonthlyChangesQuery, CategoryMonthlyChangesQueryVariables>(CategoryMonthlyChangesDocument, options);
        }
export type CategoryMonthlyChangesQueryHookResult = ReturnType<typeof useCategoryMonthlyChangesQuery>;
export type CategoryMonthlyChangesLazyQueryHookResult = ReturnType<typeof useCategoryMonthlyChangesLazyQuery>;
export type CategoryMonthlyChangesSuspenseQueryHookResult = ReturnType<typeof useCategoryMonthlyChangesSuspenseQuery>;
export type CategoryMonthlyChangesQueryResult = Apollo.QueryResult<CategoryMonthlyChangesQuery, CategoryMonthlyChangesQueryVariables>;
export const CategoryTypeMonthlyBalanceDocument = gql`
    query CategoryTypeMonthlyBalance($input: MonthlyAmountInput!) {
  categoryTypeMonthlyBalance(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useCategoryTypeMonthlyBalanceQuery__
 *
 * To run a query within a React component, call `useCategoryTypeMonthlyBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryTypeMonthlyBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryTypeMonthlyBalanceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryTypeMonthlyBalanceQuery(baseOptions: Apollo.QueryHookOptions<CategoryTypeMonthlyBalanceQuery, CategoryTypeMonthlyBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryTypeMonthlyBalanceQuery, CategoryTypeMonthlyBalanceQueryVariables>(CategoryTypeMonthlyBalanceDocument, options);
      }
export function useCategoryTypeMonthlyBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryTypeMonthlyBalanceQuery, CategoryTypeMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryTypeMonthlyBalanceQuery, CategoryTypeMonthlyBalanceQueryVariables>(CategoryTypeMonthlyBalanceDocument, options);
        }
export function useCategoryTypeMonthlyBalanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryTypeMonthlyBalanceQuery, CategoryTypeMonthlyBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryTypeMonthlyBalanceQuery, CategoryTypeMonthlyBalanceQueryVariables>(CategoryTypeMonthlyBalanceDocument, options);
        }
export type CategoryTypeMonthlyBalanceQueryHookResult = ReturnType<typeof useCategoryTypeMonthlyBalanceQuery>;
export type CategoryTypeMonthlyBalanceLazyQueryHookResult = ReturnType<typeof useCategoryTypeMonthlyBalanceLazyQuery>;
export type CategoryTypeMonthlyBalanceSuspenseQueryHookResult = ReturnType<typeof useCategoryTypeMonthlyBalanceSuspenseQuery>;
export type CategoryTypeMonthlyBalanceQueryResult = Apollo.QueryResult<CategoryTypeMonthlyBalanceQuery, CategoryTypeMonthlyBalanceQueryVariables>;
export const CategoryTypeMonthlyChangesDocument = gql`
    query CategoryTypeMonthlyChanges($input: MonthlyAmountInput!) {
  categoryTypeMonthlyChanges(input: $input) {
    ...MonthlyAmountData
  }
}
    ${MonthlyAmountDataFragmentDoc}`;

/**
 * __useCategoryTypeMonthlyChangesQuery__
 *
 * To run a query within a React component, call `useCategoryTypeMonthlyChangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryTypeMonthlyChangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryTypeMonthlyChangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryTypeMonthlyChangesQuery(baseOptions: Apollo.QueryHookOptions<CategoryTypeMonthlyChangesQuery, CategoryTypeMonthlyChangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryTypeMonthlyChangesQuery, CategoryTypeMonthlyChangesQueryVariables>(CategoryTypeMonthlyChangesDocument, options);
      }
export function useCategoryTypeMonthlyChangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryTypeMonthlyChangesQuery, CategoryTypeMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryTypeMonthlyChangesQuery, CategoryTypeMonthlyChangesQueryVariables>(CategoryTypeMonthlyChangesDocument, options);
        }
export function useCategoryTypeMonthlyChangesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryTypeMonthlyChangesQuery, CategoryTypeMonthlyChangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryTypeMonthlyChangesQuery, CategoryTypeMonthlyChangesQueryVariables>(CategoryTypeMonthlyChangesDocument, options);
        }
export type CategoryTypeMonthlyChangesQueryHookResult = ReturnType<typeof useCategoryTypeMonthlyChangesQuery>;
export type CategoryTypeMonthlyChangesLazyQueryHookResult = ReturnType<typeof useCategoryTypeMonthlyChangesLazyQuery>;
export type CategoryTypeMonthlyChangesSuspenseQueryHookResult = ReturnType<typeof useCategoryTypeMonthlyChangesSuspenseQuery>;
export type CategoryTypeMonthlyChangesQueryResult = Apollo.QueryResult<CategoryTypeMonthlyChangesQuery, CategoryTypeMonthlyChangesQueryVariables>;
export const UniqueYearsDocument = gql`
    query UniqueYears($input: UniqueYearsInput!) {
  uniqueYears(input: $input)
}
    `;

/**
 * __useUniqueYearsQuery__
 *
 * To run a query within a React component, call `useUniqueYearsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUniqueYearsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUniqueYearsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUniqueYearsQuery(baseOptions: Apollo.QueryHookOptions<UniqueYearsQuery, UniqueYearsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UniqueYearsQuery, UniqueYearsQueryVariables>(UniqueYearsDocument, options);
      }
export function useUniqueYearsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UniqueYearsQuery, UniqueYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UniqueYearsQuery, UniqueYearsQueryVariables>(UniqueYearsDocument, options);
        }
export function useUniqueYearsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UniqueYearsQuery, UniqueYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UniqueYearsQuery, UniqueYearsQueryVariables>(UniqueYearsDocument, options);
        }
export type UniqueYearsQueryHookResult = ReturnType<typeof useUniqueYearsQuery>;
export type UniqueYearsLazyQueryHookResult = ReturnType<typeof useUniqueYearsLazyQuery>;
export type UniqueYearsSuspenseQueryHookResult = ReturnType<typeof useUniqueYearsSuspenseQuery>;
export type UniqueYearsQueryResult = Apollo.QueryResult<UniqueYearsQuery, UniqueYearsQueryVariables>;
export const TagDocument = gql`
    query Tag($input: TagInput!) {
  tag(input: $input) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;

/**
 * __useTagQuery__
 *
 * To run a query within a React component, call `useTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTagQuery(baseOptions: Apollo.QueryHookOptions<TagQuery, TagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagQuery, TagQueryVariables>(TagDocument, options);
      }
export function useTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagQuery, TagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagQuery, TagQueryVariables>(TagDocument, options);
        }
export function useTagSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TagQuery, TagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagQuery, TagQueryVariables>(TagDocument, options);
        }
export type TagQueryHookResult = ReturnType<typeof useTagQuery>;
export type TagLazyQueryHookResult = ReturnType<typeof useTagLazyQuery>;
export type TagSuspenseQueryHookResult = ReturnType<typeof useTagSuspenseQuery>;
export type TagQueryResult = Apollo.QueryResult<TagQuery, TagQueryVariables>;
export const TagDetailsDocument = gql`
    query TagDetails($tagInput: TagInput!, $transactionsInput: TransactionsInput!) {
  tag(input: $tagInput) {
    ...TagData
    updatedAt
  }
  transactions(input: $transactionsInput) {
    ...TransactionData
  }
}
    ${TagDataFragmentDoc}
${TransactionDataFragmentDoc}`;

/**
 * __useTagDetailsQuery__
 *
 * To run a query within a React component, call `useTagDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagDetailsQuery({
 *   variables: {
 *      tagInput: // value for 'tagInput'
 *      transactionsInput: // value for 'transactionsInput'
 *   },
 * });
 */
export function useTagDetailsQuery(baseOptions: Apollo.QueryHookOptions<TagDetailsQuery, TagDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagDetailsQuery, TagDetailsQueryVariables>(TagDetailsDocument, options);
      }
export function useTagDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagDetailsQuery, TagDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagDetailsQuery, TagDetailsQueryVariables>(TagDetailsDocument, options);
        }
export function useTagDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TagDetailsQuery, TagDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagDetailsQuery, TagDetailsQueryVariables>(TagDetailsDocument, options);
        }
export type TagDetailsQueryHookResult = ReturnType<typeof useTagDetailsQuery>;
export type TagDetailsLazyQueryHookResult = ReturnType<typeof useTagDetailsLazyQuery>;
export type TagDetailsSuspenseQueryHookResult = ReturnType<typeof useTagDetailsSuspenseQuery>;
export type TagDetailsQueryResult = Apollo.QueryResult<TagDetailsQuery, TagDetailsQueryVariables>;
export const TagsDocument = gql`
    query Tags($input: TagsInput!) {
  tags(input: $input) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTagsQuery(baseOptions: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export function useTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsSuspenseQueryHookResult = ReturnType<typeof useTagsSuspenseQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const TransactionDetailsDocument = gql`
    query TransactionDetails($TransactionInput: TransactionInput!, $entriesInput: EntriesInput!) {
  transaction(input: $TransactionInput) {
    ...TransactionData
    updatedAt
    tags {
      id
      name
    }
  }
  entries(input: $entriesInput) {
    ...EntryData
  }
}
    ${TransactionDataFragmentDoc}
${EntryDataFragmentDoc}`;

/**
 * __useTransactionDetailsQuery__
 *
 * To run a query within a React component, call `useTransactionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionDetailsQuery({
 *   variables: {
 *      TransactionInput: // value for 'TransactionInput'
 *      entriesInput: // value for 'entriesInput'
 *   },
 * });
 */
export function useTransactionDetailsQuery(baseOptions: Apollo.QueryHookOptions<TransactionDetailsQuery, TransactionDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionDetailsQuery, TransactionDetailsQueryVariables>(TransactionDetailsDocument, options);
      }
export function useTransactionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionDetailsQuery, TransactionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionDetailsQuery, TransactionDetailsQueryVariables>(TransactionDetailsDocument, options);
        }
export function useTransactionDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TransactionDetailsQuery, TransactionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionDetailsQuery, TransactionDetailsQueryVariables>(TransactionDetailsDocument, options);
        }
export type TransactionDetailsQueryHookResult = ReturnType<typeof useTransactionDetailsQuery>;
export type TransactionDetailsLazyQueryHookResult = ReturnType<typeof useTransactionDetailsLazyQuery>;
export type TransactionDetailsSuspenseQueryHookResult = ReturnType<typeof useTransactionDetailsSuspenseQuery>;
export type TransactionDetailsQueryResult = Apollo.QueryResult<TransactionDetailsQuery, TransactionDetailsQueryVariables>;
export const TransactionsDocument = gql`
    query Transactions($input: TransactionsInput!) {
  transactions(input: $input) {
    ...TransactionData
  }
}
    ${TransactionDataFragmentDoc}`;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
        }
export function useTransactionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsSuspenseQueryHookResult = ReturnType<typeof useTransactionsSuspenseQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;
export const TreasuryBooksDocument = gql`
    query TreasuryBooks($input: TreasuryBooksInput!) {
  treasuryBooks(input: $input) {
    ...TreasuryBookData
    updatedAt
  }
}
    ${TreasuryBookDataFragmentDoc}`;

/**
 * __useTreasuryBooksQuery__
 *
 * To run a query within a React component, call `useTreasuryBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTreasuryBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTreasuryBooksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTreasuryBooksQuery(baseOptions: Apollo.QueryHookOptions<TreasuryBooksQuery, TreasuryBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TreasuryBooksQuery, TreasuryBooksQueryVariables>(TreasuryBooksDocument, options);
      }
export function useTreasuryBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TreasuryBooksQuery, TreasuryBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TreasuryBooksQuery, TreasuryBooksQueryVariables>(TreasuryBooksDocument, options);
        }
export function useTreasuryBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TreasuryBooksQuery, TreasuryBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TreasuryBooksQuery, TreasuryBooksQueryVariables>(TreasuryBooksDocument, options);
        }
export type TreasuryBooksQueryHookResult = ReturnType<typeof useTreasuryBooksQuery>;
export type TreasuryBooksLazyQueryHookResult = ReturnType<typeof useTreasuryBooksLazyQuery>;
export type TreasuryBooksSuspenseQueryHookResult = ReturnType<typeof useTreasuryBooksSuspenseQuery>;
export type TreasuryBooksQueryResult = Apollo.QueryResult<TreasuryBooksQuery, TreasuryBooksQueryVariables>;