import type { Route } from '../route'

export const treasuryBookHome: Route = {
  pathname: '/treasury-book',
}

export const treasuryBookAdd: Route = {
  pathname: `${treasuryBookHome.pathname}/add`,
}
