import type { Route } from '../route'

export const treasuryBookHome: Route = {
  pathname: '/treasury-book',
  titleTranslateKye: 'treasuryBookHome',
}

export const treasuryBookAdd: Route = {
  pathname: `${treasuryBookHome.pathname}/add`,
  titleTranslateKye: 'treasuryBookAdd',
}
