import { logger } from '@/server/logger'
import prisma from '../../../client'
import { LoggerMessage } from '@/server/logger/messages'
import { deleteBranch } from './deleteBranch'
import { DeleteBranchInputMock } from './mocks/input'

describe('DAO > Branch > deleteBranch', () => {
  it('deletes a branch', async () => {
    const mockDate = new Date(2020, 1, 1)

    const mock = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    await deleteBranch(DeleteBranchInputMock)

    expect(prisma.branch.update).toHaveBeenCalledTimes(1)
    expect(prisma.branch.update).toHaveBeenCalledWith({
      where: DeleteBranchInputMock,
      data: {
        deletedAt: mockDate,
      },
    })

    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.info).toHaveBeenCalledWith(
      LoggerMessage.DaoMutationExecuting,
      {
        name: 'deleteBranch',
        args: DeleteBranchInputMock,
      },
    )

    mock.mockRestore()
  })
})
