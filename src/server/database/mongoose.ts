// import mongoose from 'mongoose'

// /**
//  * MongoDB singleton instance configuration.
//  */
// const MONGODB_CONFIG = {
//   bufferCommands: false,
// }

// /**
//  * MongoDB singleton instance.
//  */
// export const MONGODB = (() => {
//   const MONGODB_URI = process.env.MONGODB_URI

//   if (!MONGODB_URI) {
//     throw new Error(
//       'Please define the MONGODB_URI environment variable inside .env.local'
//     )
//   }

//   return mongoose.connect(MONGODB_URI, MONGODB_CONFIG)
// })()
