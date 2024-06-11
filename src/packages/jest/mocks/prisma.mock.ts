export const prismaClientMock = {
  branch: {
    delete: jest.fn(),
    update: jest.fn(),
  },
} as const

jest.mock('@/server/db/prisma/client', () => prismaClientMock)
