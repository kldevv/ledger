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
  branchId: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  group: AccountGroup;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AccountBalance = {
  __typename?: 'AccountBalance';
  account: Base;
  accountGroup: Base;
  balance: Scalars['Float']['output'];
  type: CategoryType;
};

export type AccountBalanceFilter = {
  status?: InputMaybe<EntryStatus>;
  treasuryBookId: Scalars['String']['input'];
};

export type AccountGroup = {
  __typename?: 'AccountGroup';
  branchId: Scalars['String']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: AccountingType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AccountGroupInput = {
  id: Scalars['String']['input'];
};

export type AccountGroupsInput = {
  branchId: Scalars['String']['input'];
};

export type AccountInput = {
  id: Scalars['String']['input'];
};

export const AccountingElement = {
  ACCOUNT: 'ACCOUNT',
  ACCOUNTING_TYPE: 'ACCOUNTING_TYPE',
  ACCOUNT_GROUP: 'ACCOUNT_GROUP'
} as const;

export type AccountingElement = typeof AccountingElement[keyof typeof AccountingElement];
export const AccountingType = {
  ASSETS: 'ASSETS',
  EQUITY: 'EQUITY',
  LIABILITIES: 'LIABILITIES'
} as const;

export type AccountingType = typeof AccountingType[keyof typeof AccountingType];
export type AccountsInput = {
  accountGroupId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
};

export type AddAccountGroupInput = {
  branchId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: AccountingType;
};

export type AddAccountInput = {
  accountGroupId: Scalars['String']['input'];
  branchId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type AddBranchInput = {
  currency: Currency;
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type AddEntryInput = {
  accountId: Scalars['String']['input'];
  credit: Scalars['Float']['input'];
  debit: Scalars['Float']['input'];
  memo: Scalars['String']['input'];
  status: EntryStatus;
  transactionDate: Scalars['DateTime']['input'];
};

export type AddJournalEntryInput = {
  accountId: Scalars['String']['input'];
  credit: Scalars['Float']['input'];
  debit: Scalars['Float']['input'];
  memo: Scalars['String']['input'];
  status: EntryStatus;
  transactionDate: Scalars['DateTime']['input'];
};

export type AddJournalInput = {
  accrualDate: Scalars['DateTime']['input'];
  branchId: Scalars['String']['input'];
  entries: Array<AddJournalEntryInput>;
  links: Array<Scalars['String']['input']>;
  note: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
};

export type AddLinkInput = {
  name: Scalars['String']['input'];
  type: LinkType;
  userId: Scalars['String']['input'];
};

export type AddTagInput = {
  branchId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: TagType;
};

export type AddTransactionInput = {
  accrualDate: Scalars['DateTime']['input'];
  entries: Array<AddEntryInput>;
  note: Scalars['String']['input'];
  tagIds: Array<Scalars['String']['input']>;
  treasuryBookId: Scalars['String']['input'];
};

export type Base = {
  __typename?: 'Base';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Branch = {
  __typename?: 'Branch';
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type BranchInput = {
  id: Scalars['String']['input'];
};

export type BranchesInput = {
  userId: Scalars['String']['input'];
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
export const DateStandard = {
  ACCRUAL: 'ACCRUAL',
  TRANSACTION: 'TRANSACTION'
} as const;

export type DateStandard = typeof DateStandard[keyof typeof DateStandard];
export const DateType = {
  ACCRUAL: 'ACCRUAL',
  TRANSACTION: 'TRANSACTION'
} as const;

export type DateType = typeof DateType[keyof typeof DateType];
export type DebitAndCredit = {
  __typename?: 'DebitAndCredit';
  credit: Scalars['Float']['output'];
  debit: Scalars['Float']['output'];
};

export type EntriesInput = {
  accountGroupId?: InputMaybe<Scalars['String']['input']>;
  accountId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  journalId?: InputMaybe<Scalars['String']['input']>;
};

export type Entry = {
  __typename?: 'Entry';
  account: EntryAccountInfo;
  branchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  credit: Scalars['Float']['output'];
  currency: Currency;
  debit: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  journal: EntryJournalInfo;
  memo: Scalars['String']['output'];
  status: EntryStatus;
  transactionDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EntryAccountInfo = {
  __typename?: 'EntryAccountInfo';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EntryInput = {
  id: Scalars['String']['input'];
};

export type EntryJournalInfo = {
  __typename?: 'EntryJournalInfo';
  accrualDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  note: Scalars['String']['output'];
};

export const EntryStatus = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING'
} as const;

export type EntryStatus = typeof EntryStatus[keyof typeof EntryStatus];
export type Journal = {
  __typename?: 'Journal';
  accrualDate: Scalars['DateTime']['output'];
  amount: Scalars['Float']['output'];
  branchId: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  links?: Maybe<Array<JournalLink>>;
  note: Scalars['String']['output'];
  status: EntryStatus;
  tags?: Maybe<Array<JournalTag>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type JournalInput = {
  id: Scalars['String']['input'];
};

export type JournalLink = {
  __typename?: 'JournalLink';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type JournalTag = {
  __typename?: 'JournalTag';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type JournalsInput = {
  accountGroupId?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['String']['input']>;
  linkId?: InputMaybe<Scalars['String']['input']>;
  tagId?: InputMaybe<Scalars['String']['input']>;
};

export type Link = {
  __typename?: 'Link';
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: LinkType;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type LinkInput = {
  id: Scalars['String']['input'];
};

export const LinkType = {
  FX: 'FX',
  GENERAL: 'GENERAL'
} as const;

export type LinkType = typeof LinkType[keyof typeof LinkType];
export type LinksInput = {
  userId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Account;
  addAccountGroup: AccountGroup;
  addBranch: Branch;
  addJournal: Journal;
  addLink: Link;
  addTag: Tag;
  addTransaction: Transaction;
  updateAccount: Account;
  updateAccountGroup: AccountGroup;
  updateBranch: Branch;
  updateJournal: Journal;
  updateLink: Link;
  updateTag: Tag;
  updateTransaction: Transaction;
};


export type MutationAddAccountArgs = {
  input: AddAccountInput;
};


export type MutationAddAccountGroupArgs = {
  input: AddAccountGroupInput;
};


export type MutationAddBranchArgs = {
  input: AddBranchInput;
};


export type MutationAddJournalArgs = {
  input: AddJournalInput;
};


export type MutationAddLinkArgs = {
  input: AddLinkInput;
};


export type MutationAddTagArgs = {
  input: AddTagInput;
};


export type MutationAddTransactionArgs = {
  input: AddTransactionInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateAccountGroupArgs = {
  input: UpdateAccountGroupInput;
};


export type MutationUpdateBranchArgs = {
  input: UpdateBranchInput;
};


export type MutationUpdateJournalArgs = {
  input: UpdateJournalInput;
};


export type MutationUpdateLinkArgs = {
  input: UpdateLinkInput;
};


export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


export type MutationUpdateTransactionArgs = {
  input: UpdateTransactionInput;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accountBalance: Array<AccountBalance>;
  accountGroup?: Maybe<AccountGroup>;
  accountGroups: Array<AccountGroup>;
  accounts: Array<Account>;
  branch?: Maybe<Branch>;
  branches: Array<Branch>;
  entries: Array<Entry>;
  entry: Entry;
  journal: Journal;
  journals: Array<Journal>;
  link?: Maybe<Link>;
  links: Array<Link>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  totalOverMonths: Array<TotalOverMonths>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  uniqueYears: Array<Scalars['Int']['output']>;
};


export type QueryAccountArgs = {
  input: AccountInput;
};


export type QueryAccountBalanceArgs = {
  input: AccountBalanceFilter;
};


export type QueryAccountGroupArgs = {
  input: AccountGroupInput;
};


export type QueryAccountGroupsArgs = {
  input: AccountGroupsInput;
};


export type QueryAccountsArgs = {
  input: AccountsInput;
};


export type QueryBranchArgs = {
  input: BranchInput;
};


export type QueryBranchesArgs = {
  input: BranchesInput;
};


export type QueryEntriesArgs = {
  input: EntriesInput;
};


export type QueryEntryArgs = {
  input: EntryInput;
};


export type QueryJournalArgs = {
  input: JournalInput;
};


export type QueryJournalsArgs = {
  input: JournalsInput;
};


export type QueryLinkArgs = {
  input: LinkInput;
};


export type QueryLinksArgs = {
  input: LinksInput;
};


export type QueryTagArgs = {
  input: TagInput;
};


export type QueryTagsArgs = {
  input: TagsInput;
};


export type QueryTotalOverMonthsArgs = {
  input: TotalOverMonthsInput;
};


export type QueryTransactionArgs = {
  input: TransactionInput;
};


export type QueryTransactionsArgs = {
  input: TransactionsInput;
};


export type QueryUniqueYearsArgs = {
  input: UniqueYearsInput;
};

export type Tag = {
  __typename?: 'Tag';
  branchId: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: TagType;
  updatedAt: Scalars['DateTime']['output'];
};

export type TagInput = {
  id: Scalars['String']['input'];
};

export const TagType = {
  GENERAL: 'GENERAL',
  ORGANIZATION: 'ORGANIZATION',
  PEOPLE: 'PEOPLE',
  PROPERTY: 'PROPERTY',
  TRAVEL: 'TRAVEL'
} as const;

export type TagType = typeof TagType[keyof typeof TagType];
export type TagsInput = {
  branchId: Scalars['String']['input'];
};

export type TotalOverMonths = {
  __typename?: 'TotalOverMonths';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  total: Array<DebitAndCredit>;
};

export type TotalOverMonthsInput = {
  branchId: Scalars['String']['input'];
  groupByElement: AccountingElement;
  standard: DateStandard;
  status?: InputMaybe<EntryStatus>;
  year?: InputMaybe<Scalars['Int']['input']>;
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

export type UniqueYearsInput = {
  treasuryBookId: Scalars['String']['input'];
  type: DateType;
};

export type UpdateAccountGroupInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: AccountingType;
};

export type UpdateAccountInput = {
  accountGroupId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateBranchInput = {
  currency: Currency;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateJournalEntryInput = {
  accountId: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  credit: Scalars['Float']['input'];
  debit: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  memo: Scalars['String']['input'];
  status: EntryStatus;
  transactionDate: Scalars['DateTime']['input'];
};

export type UpdateJournalInput = {
  accrualDate: Scalars['DateTime']['input'];
  entries: Array<UpdateJournalEntryInput>;
  id: Scalars['String']['input'];
  links: Array<Scalars['String']['input']>;
  note: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
};

export type UpdateLinkInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: LinkType;
};

export type UpdateTagInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: TagType;
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
  AccountBalance: ResolverTypeWrapper<AccountBalance>;
  AccountBalanceFilter: AccountBalanceFilter;
  AccountGroup: ResolverTypeWrapper<AccountGroup>;
  AccountGroupInput: AccountGroupInput;
  AccountGroupsInput: AccountGroupsInput;
  AccountInput: AccountInput;
  AccountingElement: AccountingElement;
  AccountingType: AccountingType;
  AccountsInput: AccountsInput;
  AddAccountGroupInput: AddAccountGroupInput;
  AddAccountInput: AddAccountInput;
  AddBranchInput: AddBranchInput;
  AddEntryInput: AddEntryInput;
  AddJournalEntryInput: AddJournalEntryInput;
  AddJournalInput: AddJournalInput;
  AddLinkInput: AddLinkInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  Base: ResolverTypeWrapper<Base>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Branch: ResolverTypeWrapper<Branch>;
  BranchInput: BranchInput;
  BranchesInput: BranchesInput;
  CategoryType: CategoryType;
  Currency: Currency;
  DateStandard: DateStandard;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateType: DateType;
  DebitAndCredit: ResolverTypeWrapper<DebitAndCredit>;
  EntriesInput: EntriesInput;
  Entry: ResolverTypeWrapper<Entry>;
  EntryAccountInfo: ResolverTypeWrapper<EntryAccountInfo>;
  EntryInput: EntryInput;
  EntryJournalInfo: ResolverTypeWrapper<EntryJournalInfo>;
  EntryStatus: EntryStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Journal: ResolverTypeWrapper<Journal>;
  JournalInput: JournalInput;
  JournalLink: ResolverTypeWrapper<JournalLink>;
  JournalTag: ResolverTypeWrapper<JournalTag>;
  JournalsInput: JournalsInput;
  Link: ResolverTypeWrapper<Link>;
  LinkInput: LinkInput;
  LinkType: LinkType;
  LinksInput: LinksInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagInput: TagInput;
  TagType: TagType;
  TagsInput: TagsInput;
  TotalOverMonths: ResolverTypeWrapper<TotalOverMonths>;
  TotalOverMonthsInput: TotalOverMonthsInput;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionInput: TransactionInput;
  TransactionsInput: TransactionsInput;
  UniqueYearsInput: UniqueYearsInput;
  UpdateAccountGroupInput: UpdateAccountGroupInput;
  UpdateAccountInput: UpdateAccountInput;
  UpdateBranchInput: UpdateBranchInput;
  UpdateJournalEntryInput: UpdateJournalEntryInput;
  UpdateJournalInput: UpdateJournalInput;
  UpdateLinkInput: UpdateLinkInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AccountBalance: AccountBalance;
  AccountBalanceFilter: AccountBalanceFilter;
  AccountGroup: AccountGroup;
  AccountGroupInput: AccountGroupInput;
  AccountGroupsInput: AccountGroupsInput;
  AccountInput: AccountInput;
  AccountsInput: AccountsInput;
  AddAccountGroupInput: AddAccountGroupInput;
  AddAccountInput: AddAccountInput;
  AddBranchInput: AddBranchInput;
  AddEntryInput: AddEntryInput;
  AddJournalEntryInput: AddJournalEntryInput;
  AddJournalInput: AddJournalInput;
  AddLinkInput: AddLinkInput;
  AddTagInput: AddTagInput;
  AddTransactionInput: AddTransactionInput;
  Base: Base;
  Boolean: Scalars['Boolean']['output'];
  Branch: Branch;
  BranchInput: BranchInput;
  BranchesInput: BranchesInput;
  DateTime: Scalars['DateTime']['output'];
  DebitAndCredit: DebitAndCredit;
  EntriesInput: EntriesInput;
  Entry: Entry;
  EntryAccountInfo: EntryAccountInfo;
  EntryInput: EntryInput;
  EntryJournalInfo: EntryJournalInfo;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Journal: Journal;
  JournalInput: JournalInput;
  JournalLink: JournalLink;
  JournalTag: JournalTag;
  JournalsInput: JournalsInput;
  Link: Link;
  LinkInput: LinkInput;
  LinksInput: LinksInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  TagInput: TagInput;
  TagsInput: TagsInput;
  TotalOverMonths: TotalOverMonths;
  TotalOverMonthsInput: TotalOverMonthsInput;
  Transaction: Transaction;
  TransactionInput: TransactionInput;
  TransactionsInput: TransactionsInput;
  UniqueYearsInput: UniqueYearsInput;
  UpdateAccountGroupInput: UpdateAccountGroupInput;
  UpdateAccountInput: UpdateAccountInput;
  UpdateBranchInput: UpdateBranchInput;
  UpdateJournalEntryInput: UpdateJournalEntryInput;
  UpdateJournalInput: UpdateJournalInput;
  UpdateLinkInput: UpdateLinkInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTransactionInput: UpdateTransactionInput;
};

export type AccountResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  branchId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  group?: Resolver<ResolversTypes['AccountGroup'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountBalanceResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['AccountBalance'] = ResolversParentTypes['AccountBalance']> = {
  account?: Resolver<ResolversTypes['Base'], ParentType, ContextType>;
  accountGroup?: Resolver<ResolversTypes['Base'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CategoryType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountGroupResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['AccountGroup'] = ResolversParentTypes['AccountGroup']> = {
  branchId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AccountingType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Base'] = ResolversParentTypes['Base']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Branch'] = ResolversParentTypes['Branch']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DebitAndCreditResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['DebitAndCredit'] = ResolversParentTypes['DebitAndCredit']> = {
  credit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  debit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  account?: Resolver<ResolversTypes['EntryAccountInfo'], ParentType, ContextType>;
  branchId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  debit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  journal?: Resolver<ResolversTypes['EntryJournalInfo'], ParentType, ContextType>;
  memo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>;
  transactionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntryAccountInfoResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['EntryAccountInfo'] = ResolversParentTypes['EntryAccountInfo']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntryJournalInfoResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['EntryJournalInfo'] = ResolversParentTypes['EntryJournalInfo']> = {
  accrualDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JournalResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Journal'] = ResolversParentTypes['Journal']> = {
  accrualDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  branchId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  links?: Resolver<Maybe<Array<ResolversTypes['JournalLink']>>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['JournalTag']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JournalLinkResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['JournalLink'] = ResolversParentTypes['JournalLink']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JournalTagResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['JournalTag'] = ResolversParentTypes['JournalTag']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LinkType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationAddAccountArgs, 'input'>>;
  addAccountGroup?: Resolver<ResolversTypes['AccountGroup'], ParentType, ContextType, RequireFields<MutationAddAccountGroupArgs, 'input'>>;
  addBranch?: Resolver<ResolversTypes['Branch'], ParentType, ContextType, RequireFields<MutationAddBranchArgs, 'input'>>;
  addJournal?: Resolver<ResolversTypes['Journal'], ParentType, ContextType, RequireFields<MutationAddJournalArgs, 'input'>>;
  addLink?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationAddLinkArgs, 'input'>>;
  addTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationAddTagArgs, 'input'>>;
  addTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationAddTransactionArgs, 'input'>>;
  updateAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'input'>>;
  updateAccountGroup?: Resolver<ResolversTypes['AccountGroup'], ParentType, ContextType, RequireFields<MutationUpdateAccountGroupArgs, 'input'>>;
  updateBranch?: Resolver<ResolversTypes['Branch'], ParentType, ContextType, RequireFields<MutationUpdateBranchArgs, 'input'>>;
  updateJournal?: Resolver<ResolversTypes['Journal'], ParentType, ContextType, RequireFields<MutationUpdateJournalArgs, 'input'>>;
  updateLink?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationUpdateLinkArgs, 'input'>>;
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'input'>>;
  updateTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationUpdateTransactionArgs, 'input'>>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'input'>>;
  accountBalance?: Resolver<Array<ResolversTypes['AccountBalance']>, ParentType, ContextType, RequireFields<QueryAccountBalanceArgs, 'input'>>;
  accountGroup?: Resolver<Maybe<ResolversTypes['AccountGroup']>, ParentType, ContextType, RequireFields<QueryAccountGroupArgs, 'input'>>;
  accountGroups?: Resolver<Array<ResolversTypes['AccountGroup']>, ParentType, ContextType, RequireFields<QueryAccountGroupsArgs, 'input'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountsArgs, 'input'>>;
  branch?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType, RequireFields<QueryBranchArgs, 'input'>>;
  branches?: Resolver<Array<ResolversTypes['Branch']>, ParentType, ContextType, RequireFields<QueryBranchesArgs, 'input'>>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryEntriesArgs, 'input'>>;
  entry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<QueryEntryArgs, 'input'>>;
  journal?: Resolver<ResolversTypes['Journal'], ParentType, ContextType, RequireFields<QueryJournalArgs, 'input'>>;
  journals?: Resolver<Array<ResolversTypes['Journal']>, ParentType, ContextType, RequireFields<QueryJournalsArgs, 'input'>>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, RequireFields<QueryLinkArgs, 'input'>>;
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType, RequireFields<QueryLinksArgs, 'input'>>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagArgs, 'input'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'input'>>;
  totalOverMonths?: Resolver<Array<ResolversTypes['TotalOverMonths']>, ParentType, ContextType, RequireFields<QueryTotalOverMonthsArgs, 'input'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'input'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'input'>>;
  uniqueYears?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryUniqueYearsArgs, 'input'>>;
};

export type TagResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  branchId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TagType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalOverMonthsResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TotalOverMonths'] = ResolversParentTypes['TotalOverMonths']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<Array<ResolversTypes['DebitAndCredit']>, ParentType, ContextType>;
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

export type Resolvers<ContextType = ApolloServerContext> = {
  Account?: AccountResolvers<ContextType>;
  AccountBalance?: AccountBalanceResolvers<ContextType>;
  AccountGroup?: AccountGroupResolvers<ContextType>;
  Base?: BaseResolvers<ContextType>;
  Branch?: BranchResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DebitAndCredit?: DebitAndCreditResolvers<ContextType>;
  Entry?: EntryResolvers<ContextType>;
  EntryAccountInfo?: EntryAccountInfoResolvers<ContextType>;
  EntryJournalInfo?: EntryJournalInfoResolvers<ContextType>;
  Journal?: JournalResolvers<ContextType>;
  JournalLink?: JournalLinkResolvers<ContextType>;
  JournalTag?: JournalTagResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TotalOverMonths?: TotalOverMonthsResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
};


export type AccountDataFragment = { __typename?: 'Account', id: string, name: string, count: number, createdAt: Date, group: { __typename?: 'AccountGroup', id: string, name: string } };

export type AccountGroupDataFragment = { __typename?: 'AccountGroup', id: string, name: string, type: AccountingType, createdAt: Date, count?: number | null };

export type BranchDataFragment = { __typename?: 'Branch', id: string, name: string, userId: string, currency: Currency, createdAt: Date, updatedAt: Date, deletedAt?: Date | null };

export type EntryDataFragment = { __typename?: 'Entry', id: string, transactionDate: Date, debit: number, credit: number, status: EntryStatus, createdAt: Date, updatedAt: Date, memo: string, account: { __typename?: 'EntryAccountInfo', id: string, name: string }, journal: { __typename?: 'EntryJournalInfo', id: string, note: string } };

export type JournalDataFragment = { __typename?: 'Journal', id: string, accrualDate: Date, note: string, status: EntryStatus, amount: number, createdAt: Date };

export type LinkDataFragment = { __typename?: 'Link', id: string, name: string, userId: string, type: LinkType, count: number, createdAt: Date, updatedAt: Date, deletedAt?: Date | null };

export type TagDataFragment = { __typename?: 'Tag', id: string, name: string, createdAt: Date, type: TagType, count: number };

export type TransactionDataFragment = { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string };

export type AddAccountMutationVariables = Exact<{
  input: AddAccountInput;
}>;


export type AddAccountMutation = { __typename?: 'Mutation', addAccount: { __typename?: 'Account', id: string, name: string, count: number, createdAt: Date, group: { __typename?: 'AccountGroup', id: string, name: string } } };

export type AddAccountGroupMutationVariables = Exact<{
  input: AddAccountGroupInput;
}>;


export type AddAccountGroupMutation = { __typename?: 'Mutation', addAccountGroup: { __typename?: 'AccountGroup', id: string, name: string, type: AccountingType, createdAt: Date, count?: number | null } };

export type AddBranchMutationVariables = Exact<{
  input: AddBranchInput;
}>;


export type AddBranchMutation = { __typename?: 'Mutation', addBranch: { __typename?: 'Branch', id: string, name: string, userId: string, currency: Currency, createdAt: Date, updatedAt: Date, deletedAt?: Date | null } };

export type AddJournalMutationVariables = Exact<{
  input: AddJournalInput;
}>;


export type AddJournalMutation = { __typename?: 'Mutation', addJournal: { __typename?: 'Journal', id: string, accrualDate: Date, note: string, status: EntryStatus, amount: number, createdAt: Date } };

export type AddLinkMutationVariables = Exact<{
  input: AddLinkInput;
}>;


export type AddLinkMutation = { __typename?: 'Mutation', addLink: { __typename?: 'Link', id: string, name: string, userId: string, type: LinkType, count: number, createdAt: Date, updatedAt: Date, deletedAt?: Date | null } };

export type AddTagMutationVariables = Exact<{
  input: AddTagInput;
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, type: TagType, count: number } };

export type UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: string, name: string, count: number, createdAt: Date, group: { __typename?: 'AccountGroup', id: string, name: string } } };

export type UpdateAccountGroupMutationVariables = Exact<{
  input: UpdateAccountGroupInput;
}>;


export type UpdateAccountGroupMutation = { __typename?: 'Mutation', updateAccountGroup: { __typename?: 'AccountGroup', id: string, name: string, type: AccountingType, createdAt: Date, count?: number | null } };

export type UpdateBranchMutationVariables = Exact<{
  input: UpdateBranchInput;
}>;


export type UpdateBranchMutation = { __typename?: 'Mutation', updateBranch: { __typename?: 'Branch', id: string, name: string, userId: string, currency: Currency, createdAt: Date, updatedAt: Date, deletedAt?: Date | null } };

export type UpdateJournalMutationVariables = Exact<{
  input: UpdateJournalInput;
}>;


export type UpdateJournalMutation = { __typename?: 'Mutation', updateJournal: { __typename?: 'Journal', id: string, accrualDate: Date, note: string, status: EntryStatus, amount: number, createdAt: Date } };

export type UpdateLinkMutationVariables = Exact<{
  input: UpdateLinkInput;
}>;


export type UpdateLinkMutation = { __typename?: 'Mutation', updateLink: { __typename?: 'Link', id: string, name: string, userId: string, type: LinkType, count: number, createdAt: Date, updatedAt: Date, deletedAt?: Date | null } };

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, type: TagType, count: number } };

export type AddTransactionMutationVariables = Exact<{
  input: AddTransactionInput;
}>;


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string } };

export type UpdateTransactionMutationVariables = Exact<{
  input: UpdateTransactionInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string } };

export type AccountQueryVariables = Exact<{
  input: AccountInput;
}>;


export type AccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', deletedAt?: Date | null, updatedAt: Date, branchId: string, id: string, name: string, count: number, createdAt: Date, group: { __typename?: 'AccountGroup', id: string, name: string } } | null };

export type AccountGroupQueryVariables = Exact<{
  input: AccountGroupInput;
}>;


export type AccountGroupQuery = { __typename?: 'Query', accountGroup?: { __typename?: 'AccountGroup', updatedAt: Date, deletedAt?: Date | null, branchId: string, id: string, name: string, type: AccountingType, createdAt: Date, count?: number | null } | null };

export type AccountGroupsQueryVariables = Exact<{
  input: AccountGroupsInput;
}>;


export type AccountGroupsQuery = { __typename?: 'Query', accountGroups: Array<{ __typename?: 'AccountGroup', id: string, name: string, type: AccountingType, createdAt: Date, count?: number | null }> };

export type AccountsQueryVariables = Exact<{
  input: AccountsInput;
}>;


export type AccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string, name: string, count: number, createdAt: Date, group: { __typename?: 'AccountGroup', id: string, name: string } }> };

export type BranchQueryVariables = Exact<{
  input: BranchInput;
}>;


export type BranchQuery = { __typename?: 'Query', branch?: { __typename?: 'Branch', id: string, name: string, userId: string, currency: Currency, createdAt: Date, updatedAt: Date, deletedAt?: Date | null } | null };

export type BranchesQueryVariables = Exact<{
  input: BranchesInput;
}>;


export type BranchesQuery = { __typename?: 'Query', branches: Array<{ __typename?: 'Branch', id: string, name: string, userId: string, currency: Currency, createdAt: Date, updatedAt: Date, deletedAt?: Date | null }> };

export type EntriesQueryVariables = Exact<{
  input: EntriesInput;
}>;


export type EntriesQuery = { __typename?: 'Query', entries: Array<{ __typename?: 'Entry', id: string, transactionDate: Date, debit: number, credit: number, status: EntryStatus, createdAt: Date, updatedAt: Date, memo: string, account: { __typename?: 'EntryAccountInfo', id: string, name: string }, journal: { __typename?: 'EntryJournalInfo', id: string, note: string } }> };

export type EntryQueryVariables = Exact<{
  input: EntryInput;
}>;


export type EntryQuery = { __typename?: 'Query', entry: { __typename?: 'Entry', deletedAt?: Date | null, branchId: string, currency: Currency, id: string, transactionDate: Date, debit: number, credit: number, status: EntryStatus, createdAt: Date, updatedAt: Date, memo: string, journal: { __typename?: 'EntryJournalInfo', accrualDate: Date, id: string, note: string }, account: { __typename?: 'EntryAccountInfo', id: string, name: string } } };

export type JournalQueryVariables = Exact<{
  input: JournalInput;
}>;


export type JournalQuery = { __typename?: 'Query', journal: { __typename?: 'Journal', branchId: string, updatedAt?: Date | null, deletedAt?: Date | null, currency: Currency, id: string, accrualDate: Date, note: string, status: EntryStatus, amount: number, createdAt: Date, links?: Array<{ __typename?: 'JournalLink', id: string, name: string }> | null, tags?: Array<{ __typename?: 'JournalTag', id: string, name: string }> | null } };

export type JournalsQueryVariables = Exact<{
  input: JournalsInput;
}>;


export type JournalsQuery = { __typename?: 'Query', journals: Array<{ __typename?: 'Journal', id: string, accrualDate: Date, note: string, status: EntryStatus, amount: number, createdAt: Date }> };

export type LinkQueryVariables = Exact<{
  input: LinkInput;
}>;


export type LinkQuery = { __typename?: 'Query', link?: { __typename?: 'Link', id: string, name: string, userId: string, type: LinkType, count: number, createdAt: Date, updatedAt: Date, deletedAt?: Date | null } | null };

export type LinksQueryVariables = Exact<{
  input: LinksInput;
}>;


export type LinksQuery = { __typename?: 'Query', links: Array<{ __typename?: 'Link', id: string, name: string, userId: string, type: LinkType, count: number, createdAt: Date, updatedAt: Date, deletedAt?: Date | null }> };

export type TagQueryVariables = Exact<{
  input: TagInput;
}>;


export type TagQuery = { __typename?: 'Query', tag?: { __typename?: 'Tag', updatedAt: Date, deletedAt?: Date | null, branchId: string, id: string, name: string, createdAt: Date, type: TagType, count: number } | null };

export type TagsQueryVariables = Exact<{
  input: TagsInput;
}>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, createdAt: Date, type: TagType, count: number }> };

export type TotalOverMonthsQueryVariables = Exact<{
  input: TotalOverMonthsInput;
}>;


export type TotalOverMonthsQuery = { __typename?: 'Query', totalOverMonths: Array<{ __typename?: 'TotalOverMonths', id: string, name: string, total: Array<{ __typename?: 'DebitAndCredit', debit: number, credit: number }> }> };

export type AccountBalanceQueryVariables = Exact<{
  input: AccountBalanceFilter;
}>;


export type AccountBalanceQuery = { __typename?: 'Query', accountBalance: Array<{ __typename?: 'AccountBalance', type: CategoryType, balance: number, account: { __typename?: 'Base', id: string, name: string }, accountGroup: { __typename?: 'Base', id: string, name: string } }> };

export type UniqueYearsQueryVariables = Exact<{
  input: UniqueYearsInput;
}>;


export type UniqueYearsQuery = { __typename?: 'Query', uniqueYears: Array<number> };

export type TransactionDetailsQueryVariables = Exact<{
  TransactionInput: TransactionInput;
  entriesInput: EntriesInput;
}>;


export type TransactionDetailsQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', updatedAt: Date, id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | null, entries: Array<{ __typename?: 'Entry', id: string, transactionDate: Date, debit: number, credit: number, status: EntryStatus, createdAt: Date, updatedAt: Date, memo: string, account: { __typename?: 'EntryAccountInfo', id: string, name: string }, journal: { __typename?: 'EntryJournalInfo', id: string, note: string } }> };

export type TransactionsQueryVariables = Exact<{
  input: TransactionsInput;
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: string, accrualDate: Date, note: string, status?: EntryStatus | null, amount?: number | null, createdAt: Date, treasuryBookId: string }> };

export const AccountDataFragmentDoc = gql`
    fragment AccountData on Account {
  id
  group {
    id
    name
  }
  name
  count
  createdAt
}
    `;
export const AccountGroupDataFragmentDoc = gql`
    fragment AccountGroupData on AccountGroup {
  id
  name
  type
  createdAt
  count
}
    `;
export const BranchDataFragmentDoc = gql`
    fragment BranchData on Branch {
  id
  name
  userId
  currency
  createdAt
  updatedAt
  deletedAt
}
    `;
export const EntryDataFragmentDoc = gql`
    fragment EntryData on Entry {
  id
  transactionDate
  debit
  credit
  account {
    id
    name
  }
  journal {
    id
    note
  }
  status
  createdAt
  updatedAt
  memo
}
    `;
export const JournalDataFragmentDoc = gql`
    fragment JournalData on Journal {
  id
  accrualDate
  note
  status
  amount
  createdAt
}
    `;
export const LinkDataFragmentDoc = gql`
    fragment LinkData on Link {
  id
  name
  userId
  type
  count
  createdAt
  updatedAt
  deletedAt
}
    `;
export const TagDataFragmentDoc = gql`
    fragment TagData on Tag {
  id
  name
  createdAt
  type
  count
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
export const AddAccountDocument = gql`
    mutation AddAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    ...AccountData
  }
}
    ${AccountDataFragmentDoc}`;
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
export const AddAccountGroupDocument = gql`
    mutation AddAccountGroup($input: AddAccountGroupInput!) {
  addAccountGroup(input: $input) {
    ...AccountGroupData
  }
}
    ${AccountGroupDataFragmentDoc}`;
export type AddAccountGroupMutationFn = Apollo.MutationFunction<AddAccountGroupMutation, AddAccountGroupMutationVariables>;

/**
 * __useAddAccountGroupMutation__
 *
 * To run a mutation, you first call `useAddAccountGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAccountGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAccountGroupMutation, { data, loading, error }] = useAddAccountGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAccountGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddAccountGroupMutation, AddAccountGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAccountGroupMutation, AddAccountGroupMutationVariables>(AddAccountGroupDocument, options);
      }
export type AddAccountGroupMutationHookResult = ReturnType<typeof useAddAccountGroupMutation>;
export type AddAccountGroupMutationResult = Apollo.MutationResult<AddAccountGroupMutation>;
export type AddAccountGroupMutationOptions = Apollo.BaseMutationOptions<AddAccountGroupMutation, AddAccountGroupMutationVariables>;
export const AddBranchDocument = gql`
    mutation AddBranch($input: AddBranchInput!) {
  addBranch(input: $input) {
    ...BranchData
  }
}
    ${BranchDataFragmentDoc}`;
export type AddBranchMutationFn = Apollo.MutationFunction<AddBranchMutation, AddBranchMutationVariables>;

/**
 * __useAddBranchMutation__
 *
 * To run a mutation, you first call `useAddBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBranchMutation, { data, loading, error }] = useAddBranchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddBranchMutation(baseOptions?: Apollo.MutationHookOptions<AddBranchMutation, AddBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBranchMutation, AddBranchMutationVariables>(AddBranchDocument, options);
      }
export type AddBranchMutationHookResult = ReturnType<typeof useAddBranchMutation>;
export type AddBranchMutationResult = Apollo.MutationResult<AddBranchMutation>;
export type AddBranchMutationOptions = Apollo.BaseMutationOptions<AddBranchMutation, AddBranchMutationVariables>;
export const AddJournalDocument = gql`
    mutation AddJournal($input: AddJournalInput!) {
  addJournal(input: $input) {
    ...JournalData
  }
}
    ${JournalDataFragmentDoc}`;
export type AddJournalMutationFn = Apollo.MutationFunction<AddJournalMutation, AddJournalMutationVariables>;

/**
 * __useAddJournalMutation__
 *
 * To run a mutation, you first call `useAddJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addJournalMutation, { data, loading, error }] = useAddJournalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddJournalMutation(baseOptions?: Apollo.MutationHookOptions<AddJournalMutation, AddJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddJournalMutation, AddJournalMutationVariables>(AddJournalDocument, options);
      }
export type AddJournalMutationHookResult = ReturnType<typeof useAddJournalMutation>;
export type AddJournalMutationResult = Apollo.MutationResult<AddJournalMutation>;
export type AddJournalMutationOptions = Apollo.BaseMutationOptions<AddJournalMutation, AddJournalMutationVariables>;
export const AddLinkDocument = gql`
    mutation AddLink($input: AddLinkInput!) {
  addLink(input: $input) {
    ...LinkData
  }
}
    ${LinkDataFragmentDoc}`;
export type AddLinkMutationFn = Apollo.MutationFunction<AddLinkMutation, AddLinkMutationVariables>;

/**
 * __useAddLinkMutation__
 *
 * To run a mutation, you first call `useAddLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLinkMutation, { data, loading, error }] = useAddLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddLinkMutation(baseOptions?: Apollo.MutationHookOptions<AddLinkMutation, AddLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLinkMutation, AddLinkMutationVariables>(AddLinkDocument, options);
      }
export type AddLinkMutationHookResult = ReturnType<typeof useAddLinkMutation>;
export type AddLinkMutationResult = Apollo.MutationResult<AddLinkMutation>;
export type AddLinkMutationOptions = Apollo.BaseMutationOptions<AddLinkMutation, AddLinkMutationVariables>;
export const AddTagDocument = gql`
    mutation AddTag($input: AddTagInput!) {
  addTag(input: $input) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;
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
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ...AccountData
  }
}
    ${AccountDataFragmentDoc}`;
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
export const UpdateAccountGroupDocument = gql`
    mutation UpdateAccountGroup($input: UpdateAccountGroupInput!) {
  updateAccountGroup(input: $input) {
    ...AccountGroupData
  }
}
    ${AccountGroupDataFragmentDoc}`;
export type UpdateAccountGroupMutationFn = Apollo.MutationFunction<UpdateAccountGroupMutation, UpdateAccountGroupMutationVariables>;

/**
 * __useUpdateAccountGroupMutation__
 *
 * To run a mutation, you first call `useUpdateAccountGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountGroupMutation, { data, loading, error }] = useUpdateAccountGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccountGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountGroupMutation, UpdateAccountGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountGroupMutation, UpdateAccountGroupMutationVariables>(UpdateAccountGroupDocument, options);
      }
export type UpdateAccountGroupMutationHookResult = ReturnType<typeof useUpdateAccountGroupMutation>;
export type UpdateAccountGroupMutationResult = Apollo.MutationResult<UpdateAccountGroupMutation>;
export type UpdateAccountGroupMutationOptions = Apollo.BaseMutationOptions<UpdateAccountGroupMutation, UpdateAccountGroupMutationVariables>;
export const UpdateBranchDocument = gql`
    mutation UpdateBranch($input: UpdateBranchInput!) {
  updateBranch(input: $input) {
    ...BranchData
  }
}
    ${BranchDataFragmentDoc}`;
export type UpdateBranchMutationFn = Apollo.MutationFunction<UpdateBranchMutation, UpdateBranchMutationVariables>;

/**
 * __useUpdateBranchMutation__
 *
 * To run a mutation, you first call `useUpdateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBranchMutation, { data, loading, error }] = useUpdateBranchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBranchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBranchMutation, UpdateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBranchMutation, UpdateBranchMutationVariables>(UpdateBranchDocument, options);
      }
export type UpdateBranchMutationHookResult = ReturnType<typeof useUpdateBranchMutation>;
export type UpdateBranchMutationResult = Apollo.MutationResult<UpdateBranchMutation>;
export type UpdateBranchMutationOptions = Apollo.BaseMutationOptions<UpdateBranchMutation, UpdateBranchMutationVariables>;
export const UpdateJournalDocument = gql`
    mutation UpdateJournal($input: UpdateJournalInput!) {
  updateJournal(input: $input) {
    ...JournalData
  }
}
    ${JournalDataFragmentDoc}`;
export type UpdateJournalMutationFn = Apollo.MutationFunction<UpdateJournalMutation, UpdateJournalMutationVariables>;

/**
 * __useUpdateJournalMutation__
 *
 * To run a mutation, you first call `useUpdateJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJournalMutation, { data, loading, error }] = useUpdateJournalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateJournalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJournalMutation, UpdateJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateJournalMutation, UpdateJournalMutationVariables>(UpdateJournalDocument, options);
      }
export type UpdateJournalMutationHookResult = ReturnType<typeof useUpdateJournalMutation>;
export type UpdateJournalMutationResult = Apollo.MutationResult<UpdateJournalMutation>;
export type UpdateJournalMutationOptions = Apollo.BaseMutationOptions<UpdateJournalMutation, UpdateJournalMutationVariables>;
export const UpdateLinkDocument = gql`
    mutation UpdateLink($input: UpdateLinkInput!) {
  updateLink(input: $input) {
    ...LinkData
  }
}
    ${LinkDataFragmentDoc}`;
export type UpdateLinkMutationFn = Apollo.MutationFunction<UpdateLinkMutation, UpdateLinkMutationVariables>;

/**
 * __useUpdateLinkMutation__
 *
 * To run a mutation, you first call `useUpdateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkMutation, { data, loading, error }] = useUpdateLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLinkMutation, UpdateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLinkMutation, UpdateLinkMutationVariables>(UpdateLinkDocument, options);
      }
export type UpdateLinkMutationHookResult = ReturnType<typeof useUpdateLinkMutation>;
export type UpdateLinkMutationResult = Apollo.MutationResult<UpdateLinkMutation>;
export type UpdateLinkMutationOptions = Apollo.BaseMutationOptions<UpdateLinkMutation, UpdateLinkMutationVariables>;
export const UpdateTagDocument = gql`
    mutation UpdateTag($input: UpdateTagInput!) {
  updateTag(input: $input) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;
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
export const AccountDocument = gql`
    query Account($input: AccountInput!) {
  account(input: $input) {
    ...AccountData
    deletedAt
    updatedAt
    branchId
  }
}
    ${AccountDataFragmentDoc}`;

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
export function useAccountQuery(baseOptions: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables> & ({ variables: AccountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const AccountGroupDocument = gql`
    query AccountGroup($input: AccountGroupInput!) {
  accountGroup(input: $input) {
    ...AccountGroupData
    updatedAt
    deletedAt
    branchId
  }
}
    ${AccountGroupDataFragmentDoc}`;

/**
 * __useAccountGroupQuery__
 *
 * To run a query within a React component, call `useAccountGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountGroupQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountGroupQuery(baseOptions: Apollo.QueryHookOptions<AccountGroupQuery, AccountGroupQueryVariables> & ({ variables: AccountGroupQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountGroupQuery, AccountGroupQueryVariables>(AccountGroupDocument, options);
      }
export function useAccountGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountGroupQuery, AccountGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountGroupQuery, AccountGroupQueryVariables>(AccountGroupDocument, options);
        }
export function useAccountGroupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountGroupQuery, AccountGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountGroupQuery, AccountGroupQueryVariables>(AccountGroupDocument, options);
        }
export type AccountGroupQueryHookResult = ReturnType<typeof useAccountGroupQuery>;
export type AccountGroupLazyQueryHookResult = ReturnType<typeof useAccountGroupLazyQuery>;
export type AccountGroupSuspenseQueryHookResult = ReturnType<typeof useAccountGroupSuspenseQuery>;
export type AccountGroupQueryResult = Apollo.QueryResult<AccountGroupQuery, AccountGroupQueryVariables>;
export const AccountGroupsDocument = gql`
    query AccountGroups($input: AccountGroupsInput!) {
  accountGroups(input: $input) {
    ...AccountGroupData
  }
}
    ${AccountGroupDataFragmentDoc}`;

/**
 * __useAccountGroupsQuery__
 *
 * To run a query within a React component, call `useAccountGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountGroupsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountGroupsQuery(baseOptions: Apollo.QueryHookOptions<AccountGroupsQuery, AccountGroupsQueryVariables> & ({ variables: AccountGroupsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountGroupsQuery, AccountGroupsQueryVariables>(AccountGroupsDocument, options);
      }
export function useAccountGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountGroupsQuery, AccountGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountGroupsQuery, AccountGroupsQueryVariables>(AccountGroupsDocument, options);
        }
export function useAccountGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountGroupsQuery, AccountGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountGroupsQuery, AccountGroupsQueryVariables>(AccountGroupsDocument, options);
        }
export type AccountGroupsQueryHookResult = ReturnType<typeof useAccountGroupsQuery>;
export type AccountGroupsLazyQueryHookResult = ReturnType<typeof useAccountGroupsLazyQuery>;
export type AccountGroupsSuspenseQueryHookResult = ReturnType<typeof useAccountGroupsSuspenseQuery>;
export type AccountGroupsQueryResult = Apollo.QueryResult<AccountGroupsQuery, AccountGroupsQueryVariables>;
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
export function useAccountsQuery(baseOptions: Apollo.QueryHookOptions<AccountsQuery, AccountsQueryVariables> & ({ variables: AccountsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const BranchDocument = gql`
    query Branch($input: BranchInput!) {
  branch(input: $input) {
    ...BranchData
  }
}
    ${BranchDataFragmentDoc}`;

/**
 * __useBranchQuery__
 *
 * To run a query within a React component, call `useBranchQuery` and pass it any options that fit your needs.
 * When your component renders, `useBranchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBranchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBranchQuery(baseOptions: Apollo.QueryHookOptions<BranchQuery, BranchQueryVariables> & ({ variables: BranchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BranchQuery, BranchQueryVariables>(BranchDocument, options);
      }
export function useBranchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BranchQuery, BranchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BranchQuery, BranchQueryVariables>(BranchDocument, options);
        }
export function useBranchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BranchQuery, BranchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BranchQuery, BranchQueryVariables>(BranchDocument, options);
        }
export type BranchQueryHookResult = ReturnType<typeof useBranchQuery>;
export type BranchLazyQueryHookResult = ReturnType<typeof useBranchLazyQuery>;
export type BranchSuspenseQueryHookResult = ReturnType<typeof useBranchSuspenseQuery>;
export type BranchQueryResult = Apollo.QueryResult<BranchQuery, BranchQueryVariables>;
export const BranchesDocument = gql`
    query Branches($input: BranchesInput!) {
  branches(input: $input) {
    ...BranchData
  }
}
    ${BranchDataFragmentDoc}`;

/**
 * __useBranchesQuery__
 *
 * To run a query within a React component, call `useBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBranchesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBranchesQuery(baseOptions: Apollo.QueryHookOptions<BranchesQuery, BranchesQueryVariables> & ({ variables: BranchesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BranchesQuery, BranchesQueryVariables>(BranchesDocument, options);
      }
export function useBranchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BranchesQuery, BranchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BranchesQuery, BranchesQueryVariables>(BranchesDocument, options);
        }
export function useBranchesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BranchesQuery, BranchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BranchesQuery, BranchesQueryVariables>(BranchesDocument, options);
        }
export type BranchesQueryHookResult = ReturnType<typeof useBranchesQuery>;
export type BranchesLazyQueryHookResult = ReturnType<typeof useBranchesLazyQuery>;
export type BranchesSuspenseQueryHookResult = ReturnType<typeof useBranchesSuspenseQuery>;
export type BranchesQueryResult = Apollo.QueryResult<BranchesQuery, BranchesQueryVariables>;
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
export function useEntriesQuery(baseOptions: Apollo.QueryHookOptions<EntriesQuery, EntriesQueryVariables> & ({ variables: EntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const EntryDocument = gql`
    query Entry($input: EntryInput!) {
  entry(input: $input) {
    ...EntryData
    deletedAt
    journal {
      accrualDate
    }
    branchId
    currency
  }
}
    ${EntryDataFragmentDoc}`;

/**
 * __useEntryQuery__
 *
 * To run a query within a React component, call `useEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEntryQuery(baseOptions: Apollo.QueryHookOptions<EntryQuery, EntryQueryVariables> & ({ variables: EntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
      }
export function useEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryQuery, EntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
        }
export function useEntrySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EntryQuery, EntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
        }
export type EntryQueryHookResult = ReturnType<typeof useEntryQuery>;
export type EntryLazyQueryHookResult = ReturnType<typeof useEntryLazyQuery>;
export type EntrySuspenseQueryHookResult = ReturnType<typeof useEntrySuspenseQuery>;
export type EntryQueryResult = Apollo.QueryResult<EntryQuery, EntryQueryVariables>;
export const JournalDocument = gql`
    query Journal($input: JournalInput!) {
  journal(input: $input) {
    ...JournalData
    branchId
    updatedAt
    deletedAt
    links {
      id
      name
    }
    tags {
      id
      name
    }
    currency
  }
}
    ${JournalDataFragmentDoc}`;

/**
 * __useJournalQuery__
 *
 * To run a query within a React component, call `useJournalQuery` and pass it any options that fit your needs.
 * When your component renders, `useJournalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJournalQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJournalQuery(baseOptions: Apollo.QueryHookOptions<JournalQuery, JournalQueryVariables> & ({ variables: JournalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JournalQuery, JournalQueryVariables>(JournalDocument, options);
      }
export function useJournalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JournalQuery, JournalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JournalQuery, JournalQueryVariables>(JournalDocument, options);
        }
export function useJournalSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JournalQuery, JournalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JournalQuery, JournalQueryVariables>(JournalDocument, options);
        }
export type JournalQueryHookResult = ReturnType<typeof useJournalQuery>;
export type JournalLazyQueryHookResult = ReturnType<typeof useJournalLazyQuery>;
export type JournalSuspenseQueryHookResult = ReturnType<typeof useJournalSuspenseQuery>;
export type JournalQueryResult = Apollo.QueryResult<JournalQuery, JournalQueryVariables>;
export const JournalsDocument = gql`
    query Journals($input: JournalsInput!) {
  journals(input: $input) {
    ...JournalData
  }
}
    ${JournalDataFragmentDoc}`;

/**
 * __useJournalsQuery__
 *
 * To run a query within a React component, call `useJournalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJournalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJournalsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJournalsQuery(baseOptions: Apollo.QueryHookOptions<JournalsQuery, JournalsQueryVariables> & ({ variables: JournalsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JournalsQuery, JournalsQueryVariables>(JournalsDocument, options);
      }
export function useJournalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JournalsQuery, JournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JournalsQuery, JournalsQueryVariables>(JournalsDocument, options);
        }
export function useJournalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JournalsQuery, JournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JournalsQuery, JournalsQueryVariables>(JournalsDocument, options);
        }
export type JournalsQueryHookResult = ReturnType<typeof useJournalsQuery>;
export type JournalsLazyQueryHookResult = ReturnType<typeof useJournalsLazyQuery>;
export type JournalsSuspenseQueryHookResult = ReturnType<typeof useJournalsSuspenseQuery>;
export type JournalsQueryResult = Apollo.QueryResult<JournalsQuery, JournalsQueryVariables>;
export const LinkDocument = gql`
    query Link($input: LinkInput!) {
  link(input: $input) {
    ...LinkData
  }
}
    ${LinkDataFragmentDoc}`;

/**
 * __useLinkQuery__
 *
 * To run a query within a React component, call `useLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLinkQuery(baseOptions: Apollo.QueryHookOptions<LinkQuery, LinkQueryVariables> & ({ variables: LinkQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
      }
export function useLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkQuery, LinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
        }
export function useLinkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LinkQuery, LinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
        }
export type LinkQueryHookResult = ReturnType<typeof useLinkQuery>;
export type LinkLazyQueryHookResult = ReturnType<typeof useLinkLazyQuery>;
export type LinkSuspenseQueryHookResult = ReturnType<typeof useLinkSuspenseQuery>;
export type LinkQueryResult = Apollo.QueryResult<LinkQuery, LinkQueryVariables>;
export const LinksDocument = gql`
    query Links($input: LinksInput!) {
  links(input: $input) {
    ...LinkData
  }
}
    ${LinkDataFragmentDoc}`;

/**
 * __useLinksQuery__
 *
 * To run a query within a React component, call `useLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLinksQuery(baseOptions: Apollo.QueryHookOptions<LinksQuery, LinksQueryVariables> & ({ variables: LinksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinksQuery, LinksQueryVariables>(LinksDocument, options);
      }
export function useLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinksQuery, LinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinksQuery, LinksQueryVariables>(LinksDocument, options);
        }
export function useLinksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LinksQuery, LinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LinksQuery, LinksQueryVariables>(LinksDocument, options);
        }
export type LinksQueryHookResult = ReturnType<typeof useLinksQuery>;
export type LinksLazyQueryHookResult = ReturnType<typeof useLinksLazyQuery>;
export type LinksSuspenseQueryHookResult = ReturnType<typeof useLinksSuspenseQuery>;
export type LinksQueryResult = Apollo.QueryResult<LinksQuery, LinksQueryVariables>;
export const TagDocument = gql`
    query Tag($input: TagInput!) {
  tag(input: $input) {
    ...TagData
    updatedAt
    deletedAt
    branchId
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
export function useTagQuery(baseOptions: Apollo.QueryHookOptions<TagQuery, TagQueryVariables> & ({ variables: TagQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export function useTagsQuery(baseOptions: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables> & ({ variables: TagsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const TotalOverMonthsDocument = gql`
    query TotalOverMonths($input: TotalOverMonthsInput!) {
  totalOverMonths(input: $input) {
    id
    name
    total {
      debit
      credit
    }
  }
}
    `;

/**
 * __useTotalOverMonthsQuery__
 *
 * To run a query within a React component, call `useTotalOverMonthsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalOverMonthsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalOverMonthsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTotalOverMonthsQuery(baseOptions: Apollo.QueryHookOptions<TotalOverMonthsQuery, TotalOverMonthsQueryVariables> & ({ variables: TotalOverMonthsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalOverMonthsQuery, TotalOverMonthsQueryVariables>(TotalOverMonthsDocument, options);
      }
export function useTotalOverMonthsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalOverMonthsQuery, TotalOverMonthsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalOverMonthsQuery, TotalOverMonthsQueryVariables>(TotalOverMonthsDocument, options);
        }
export function useTotalOverMonthsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TotalOverMonthsQuery, TotalOverMonthsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TotalOverMonthsQuery, TotalOverMonthsQueryVariables>(TotalOverMonthsDocument, options);
        }
export type TotalOverMonthsQueryHookResult = ReturnType<typeof useTotalOverMonthsQuery>;
export type TotalOverMonthsLazyQueryHookResult = ReturnType<typeof useTotalOverMonthsLazyQuery>;
export type TotalOverMonthsSuspenseQueryHookResult = ReturnType<typeof useTotalOverMonthsSuspenseQuery>;
export type TotalOverMonthsQueryResult = Apollo.QueryResult<TotalOverMonthsQuery, TotalOverMonthsQueryVariables>;
export const AccountBalanceDocument = gql`
    query AccountBalance($input: AccountBalanceFilter!) {
  accountBalance(input: $input) {
    account {
      id
      name
    }
    accountGroup {
      id
      name
    }
    type
    balance
  }
}
    `;

/**
 * __useAccountBalanceQuery__
 *
 * To run a query within a React component, call `useAccountBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountBalanceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountBalanceQuery(baseOptions: Apollo.QueryHookOptions<AccountBalanceQuery, AccountBalanceQueryVariables> & ({ variables: AccountBalanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountBalanceQuery, AccountBalanceQueryVariables>(AccountBalanceDocument, options);
      }
export function useAccountBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountBalanceQuery, AccountBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountBalanceQuery, AccountBalanceQueryVariables>(AccountBalanceDocument, options);
        }
export function useAccountBalanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountBalanceQuery, AccountBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountBalanceQuery, AccountBalanceQueryVariables>(AccountBalanceDocument, options);
        }
export type AccountBalanceQueryHookResult = ReturnType<typeof useAccountBalanceQuery>;
export type AccountBalanceLazyQueryHookResult = ReturnType<typeof useAccountBalanceLazyQuery>;
export type AccountBalanceSuspenseQueryHookResult = ReturnType<typeof useAccountBalanceSuspenseQuery>;
export type AccountBalanceQueryResult = Apollo.QueryResult<AccountBalanceQuery, AccountBalanceQueryVariables>;
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
export function useUniqueYearsQuery(baseOptions: Apollo.QueryHookOptions<UniqueYearsQuery, UniqueYearsQueryVariables> & ({ variables: UniqueYearsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export function useTransactionDetailsQuery(baseOptions: Apollo.QueryHookOptions<TransactionDetailsQuery, TransactionDetailsQueryVariables> & ({ variables: TransactionDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export function useTransactionsQuery(baseOptions: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables> & ({ variables: TransactionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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