import type { Route } from '../route'

export const treasuryBookHome: Route = {
  pathname: '/treasury-book',
}

export const treasuryBookAdd: Route = {
  pathname: `${treasuryBookHome.pathname}/add`,
}

export const treasuryBookDetail: Route = {
  pathname: `${treasuryBookHome.pathname}/[id]`,
}

export const treasuryBookDetailEdit: Route = {
  pathname: `${treasuryBookDetail.pathname}/edit`,
}
