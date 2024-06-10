import { logger } from '@/server/logger'
import prisma from '../../../client'
import { hardDeleteBranch } from './hardDeleteBranch'
import { HardDeleteBranchInputMock } from './mocks/input'
import { LoggerMessage } from '@/server/logger/messages'

describe('DAO > Branch > hardDeleteBranch', () => {
  it('deletes a branch', async () => {
    await hardDeleteBranch(HardDeleteBranchInputMock)

    expect(prisma.branch.delete).toHaveBeenCalledTimes(1)
    expect(prisma.branch.delete).toHaveBeenCalledWith({
      where: HardDeleteBranchInputMock,
    })

    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.info).toHaveBeenCalledWith(
      LoggerMessage.DaoMutationExecuting,
      {
        name: 'hardDeleteBranch',
        args: HardDeleteBranchInputMock,
      },
    )
  })
})
