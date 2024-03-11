export * as route from './routes'

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
