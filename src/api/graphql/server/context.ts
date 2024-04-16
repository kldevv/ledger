import type { BaseContext } from '@apollo/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface ApolloServerContext extends BaseContext {
  /**
   * Next api response object
   */
  res: NextApiResponse
  /**
   * Next api request object
   */
  req: NextApiRequest
}
