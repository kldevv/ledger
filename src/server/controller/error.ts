import { TRPCError } from "@trpc/server"

// TODO: Add an error handling/logging system
export const ControllerError = (error: unknown) => {
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occured, please try again later',
    cause: error
  })
}