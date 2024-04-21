import type { BaseContext } from '@apollo/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Session } from 'next-auth'

export interface ApolloServerContext extends BaseContext {
  /**
   * Next api response object
   */
  res: NextApiResponse
  /**
   * Next api request object
   */
  req: NextApiRequest
  /**
   * User session
   */
  session: Session | null
}
