import type { Session } from 'next-auth'

/**
 * Default user id mock
 */
export const UserIdMock = 'clwedm4yn000008jtb49o7rrt'

/**
 * Default session mock
 */
export const SessionMock: Session = {
  user: {
    id: UserIdMock,
    name: 'Mock Session',
    email: 'mock@session.com',
  },
  expires: '2024-01-01T00:00:00',
}
