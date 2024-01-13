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
   * Route title translate key
   */
  titleTranslateKye: string
  /**
   * Route description translate key
   */
  descriptionTranslateKey?: string
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

/**
 * Get route by pathname
 */
export const getRouteByPathname = (pathname: string) => {
  return Object.values(route).find((r) => r.pathname === pathname)
}
