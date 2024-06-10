export const prismaClientMock = {
  branch: {
    delete: jest.fn(),
  },
} as const

jest.mock('@/server/db/prisma/client', () => prismaClientMock)
