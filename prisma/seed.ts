import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const profile = await prisma.profile.create({
    data: {
      name: 'Yoyo'
    },
  })

  console.log(profile)

  const vault = await prisma.vault.create({
    data: {
      name: 'My USD',
      ownerId: profile.id,
      currency: 'USD',
    }
  })

  console.log(vault)
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