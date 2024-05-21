import type { DocumentNode } from '@apollo/client'

export interface ApolloMocks {}

export interface ApolloMock<
  TData = Record<string, unknown>,
  TVariables = Record<string, unknown>,
> {
  /**
   * Apollo document
   */
  document: DocumentNode
  /**
   * Data
   */
  data: TData
  /**
   * Variables
   */
  variables: TVariables
  /**
   * Delay?
   */
  delay?: number
  /**
   * Error?
   */
  error?: Error
}
