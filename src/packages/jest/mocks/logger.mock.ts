export const loggerMock = {
  info: jest.fn(),
} as const

jest.mock('@/server/logger', () => ({
  __esModule: true,
  logger: loggerMock,
}))
