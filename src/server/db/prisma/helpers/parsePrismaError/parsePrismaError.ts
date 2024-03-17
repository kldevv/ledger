import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

export const parsePrismaError = (e: unknown) => {
  switch (true) {
    case e instanceof PrismaClientKnownRequestError:
      return { message: e.message, code: e.code, meta: e.meta }
    case e instanceof PrismaClientUnknownRequestError:
      return { message: e.message }
    case e instanceof PrismaClientRustPanicError:
      return { message: e.message }
    case e instanceof PrismaClientInitializationError:
      return { message: e.message, code: e.errorCode }
    case e instanceof PrismaClientValidationError:
      return { message: e.message }
    default:
      return { message: 'Unknown Prisma Error' }
  }
}
