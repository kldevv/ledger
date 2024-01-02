import { CategoryType } from "@prisma/client";

export namespace GroupBy {
  export type Filter = {
    /**
     * By year
     */
    year: number
    /**
     * By month
     */
    month: number
    /**
     * 
     */
    status: string
  }

  export type Args = {
    /**
     * Group by target
     */
    groupBy: 'YEAR' | 'MONTH' | 'QUARTER'
    /**
     * Accounting basis
     */
    basis: 'ACCURAL' | 'CASH'
    /**
     * Optional filter 
     */
    filter?: Filter
    /**
     * Vault id
     */
    vaultId: string;
  };

  export type Returns = {
    /**
     * Account id
     */
    accountId: string;
    /**
     * Category id
     */
    categoryId: string;
    /**
     * Category type
     */
    type: CategoryType;
    /**
     * Month
     */
    month: number;
    /**
     * Year
     */
    year: number;
    /**
     * Number of entries per group
     */
    count: number;
    /**
     * Total debit
     */
    debit: number;
    /**
     * Total credit
     */
    credit: number;
  }[];
}
