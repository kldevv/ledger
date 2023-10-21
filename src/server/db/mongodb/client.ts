import { MongoClient } from 'mongodb';
import Papr from 'papr';

/**
 * MongoDB clients wrapper
 */
export const mongodb = Object.freeze(() => {
  /**
   * Papr client singleton instance
   */
  const papr = new Papr()

  /**
   * MongoDB Node.js driver client singleton
   */
  const client = (async () => {
    const MONGODB_URI = process.env.MONGODB_URI
    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env'
      )
    }
    const client = await MongoClient.connect(MONGODB_URI)
    
    const MONGODB_INSTANCE_NAME = process.env.MONGODB_INSTANCE_NAME
    if (!MONGODB_INSTANCE_NAME) {
      throw new Error(
        'Please define the MONGODB_INSTANCE_NAME environment variable inside .env'
      )
    }
    const db = client.db(MONGODB_INSTANCE_NAME)

    // register db instance
    papr.initialize(db)

    return client
  })()


  return {
    client,
    papr
  }
})()
