/**
 * Prisma log messages
 */
const Prisma = '[Prisma]'

const PrismaIniting = `${Prisma} Prisma client starts initializing.`

const PrismaInitSucceeded = `${Prisma} Prisma client initialized.`

const PrismaInitFailed = `${Prisma} Prisma client failed to initialize.`

const PrismaMutationExecuted = `${Prisma} Prisma mutation executed.`

const PrismaError = `${Prisma} Prisma recevied errors.`

const PrismaWarn = `${Prisma} Prisma received warnings.`

/**
 * Dao log messages
 */
const Dao = '[DAO Method]'

const DaoMutationExecuting = `${Dao} Executing database mutation.`

export const LoggerMessage = {
  PrismaIniting,
  PrismaInitSucceeded,
  PrismaInitFailed,
  PrismaMutationExecuted,
  PrismaError,
  PrismaWarn,
  DaoMutationExecuting,
} as const
