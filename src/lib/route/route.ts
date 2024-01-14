import {
  account,
  category,
  entry,
  report,
  tag,
  transaction,
  treasuryBook,
} from './routes'

export type Route = {
  /**
   * Pathname
   */
  pathname: string
  /**
   * Optional query
   */
  query?: Record<string, string>
}

/**
 * Route Catalogue
 */
export const route = {
  ...account,
  ...category,
  ...entry,
  ...report,
  ...tag,
  ...transaction,
  ...treasuryBook,
}
