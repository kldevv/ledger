import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

export const parsePrismaError = (e: unknown) => {
  if (e instanceof PrismaClientKnownRequestError) {
    return { message: e.message, code: e.code, meta: e.meta }
  } else if (e instanceof PrismaClientUnknownRequestError) {
    return { message: e.message }
  } else if (e instanceof PrismaClientRustPanicError) {
    return { message: e.message }
  } else if (e instanceof PrismaClientInitializationError) {
    return { message: e.message, code: e.errorCode }
  } else if (e instanceof PrismaClientValidationError) {
    return { message: e.message }
  } else {
    return { message: 'Unknown Prsima Error' }
  }
}
