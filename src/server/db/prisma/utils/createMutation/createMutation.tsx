import { logger } from '@/server/logger'
import { LoggerMessage } from '@/server/logger/messages'

export interface createMutationArgs<TArgs, TData> {
  /**
   * Mutation
   */
  mutation: (args: TArgs) => Promise<TData>
  /**
   * Mutation name
   */
  name: string
  /**
   * Obscure arguments, used to mask sensitive input
   */
  obscureArgs?: Array<keyof TArgs>
}

/**
 * Factory function for database mutation
 */
export const createMutation = <TArgs, TData>({
  mutation,
  name,
}: createMutationArgs<TArgs, TData>) => {
  return (args: TArgs) => {
    logger.info(LoggerMessage.DaoMutationExecuting, {
      args,
      name,
    })

    return mutation(args)
  }
}
