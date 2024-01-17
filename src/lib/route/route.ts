import {
  account,
  category,
  common,
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
  ...common,
  ...entry,
  ...report,
  ...tag,
  ...transaction,
  ...treasuryBook,
}
