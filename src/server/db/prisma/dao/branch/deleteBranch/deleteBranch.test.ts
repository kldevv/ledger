import { logger } from '@/server/logger'
import prisma from '../../../client'
import { deleteBranch } from './deleteBranch'
import { DeleteBranchInputMock } from './mocks/input'
import { LoggerMessage } from '@/server/logger/messages'

describe('DAO > Branch > deleteBranch', () => {
  it('deletes a branch', async () => {
    await deleteBranch(DeleteBranchInputMock)

    expect(prisma.branch.delete).toHaveBeenCalledTimes(1)
    expect(prisma.branch.delete).toHaveBeenCalledWith({
      where: DeleteBranchInputMock,
    })

    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.info).toHaveBeenCalledWith(
      LoggerMessage.DaoMutationExecuting,
      {
        name: 'deleteBranch',
        args: DeleteBranchInputMock,
      },
    )
  })
})
