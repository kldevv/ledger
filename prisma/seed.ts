// import { AccountingType, Branch, Currency, PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// const main = async () => {
//   /**
//    * Seed user
//    */
//   console.log('creating profile...')

//   const user = await prisma.user.create({
//     data: {
//       name: 'Yoyo',
//     },
//   })

//   console.log(`created user: ${JSON.stringify(user)}.`)

//   // Seed branches
//   const branches = new Map<Currency, Branch>()

//   await Promise.all(
//     Object.values(Currency).map(async (currency) => {
//       console.log(`creating treasury book for ${currency}...`)

//       const branch = await prisma.branch.create({
//         data: {
//           name: `Seed ${currency} Branch`,
//           userId: user.id,
//           currency: currency,
//         },
//       })

//       branches.set(currency, branch)

//       console.log(`created treasury book ${JSON.stringify(branch)}.`)
//     }),
//   )

//   // Seed account group and account
//   await Promise.all(
//     Object.values(Currency).map(async (currency) => {
//       const branch = branches.get(currency)

//       console.log(
//         `creating categories and accounts for ${currency} treasury book...`,
//       )

//       Object.values(AccountingType).map(async (type) => {
//         const accountGroup = await prisma.accountGroup.create({
//           data: {
//             name: `Default ${type} Category`,
//             type,
//             branchId: branch?.id ?? '',
//           },
//         })

//         await prisma.account.create({
//           data: {
//             name: `Default ${type} Account`,
//             accountGroupId: accountGroup.id,
//             branchId: branch?.id ?? '',
//           },
//         })
//       })

//       console.log(
//         `created account group and accounts for ${currency} treasury book.`,
//       )
//     }),
//   )

//   console.log('Done.')
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
