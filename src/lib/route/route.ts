import * as treasuryBook from './routes'

export type Route = {
  /**
   * Route title translate key
   */
  titleTranslateKye: string
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
  ...treasuryBook,
}
