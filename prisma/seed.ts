import {
  CategoryType,
  Currency,
  PrismaClient,
  TreasuryBook,
} from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  /**
   * Seed profile
   */
  console.log('creating profile...')

  const profile = await prisma.profile.create({
    data: {
      name: 'Yoyo',
    },
  })

  console.log(`created profile: ${JSON.stringify(profile)}.`)

  /**
   * Seed treasury books
   */
  const treasuryBooks = new Map<Currency, TreasuryBook>()

  await Promise.all(
    Object.values(Currency).map(async (currency) => {
      console.log(`creating treasury book for ${currency}...`)

      const treasuryBook = await prisma.treasuryBook.create({
        data: {
          name: `Seed ${currency} Treasury Book`,
          ownerId: profile.id,
          currency: currency,
        },
      })

      treasuryBooks.set(currency, treasuryBook)

      console.log(`created treasury book ${JSON.stringify(treasuryBook)}.`)
    }),
  )

  /**
   * Seed category and account
   */
  await Promise.all(
    Object.values(Currency).map(async (currency) => {
      const treasuryBook = treasuryBooks.get(currency)

      console.log(
        `creating categories and accounts for ${currency} treasury book...`,
      )

      Object.values(CategoryType).map(async (type) => {
        const category = await prisma.category.create({
          data: {
            name: `Default ${type} Category`,
            type,
            treasuryBookId: treasuryBook?.id ?? '',
          },
        })

        await prisma.account.create({
          data: {
            name: `Default ${type} Account`,
            categoryId: category.id,
            treasuryBookId: treasuryBook?.id ?? '',
          },
        })
      })

      console.log(
        `created categories and accounts for ${currency} treasury book.`,
      )
    }),
  )

  console.log('Done.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
