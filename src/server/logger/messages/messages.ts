/**
 * Prisma log messages
 */
const Prisma = '[Prisma]'

export const PrismaIniting = `${Prisma} Prisma client starts initializing.`

export const PrismaInitSucceeded = `${Prisma} Prisma client initialized.`

export const PrismaInitFailed = `${Prisma} Prisma client failed to initialize.`

export const PrismaMutationExecuted = `${Prisma} Prisma mutation executed.`

export const PrismaError = `${Prisma} Prisma recevied errors.`

export const PrismaWarn = `${Prisma} Prisma received warnings.`

/**
 * Dao log messages
 */
const Dao = '[DAO Method]'

export const DaoMutationExecuting = `${Dao} Executing database mutation.`

/**
 * Github Auth Provider
 */
const GithubAuth = '[GithubAuth]'

export const MISSING_AUTH_GITHUB_ID = `${GithubAuth} Missing AUTH_GITHUB_ID in the environment`

export const MISSING_AUTH_GITHUB_SECRET = `${GithubAuth} Missing AUTH_GITHUB_SECRET in the environment`
