import type { Route } from '../route'

export const accountHome: Route = {
  pathname: '/account',
  titleTranslateKye: 'accountHome',
}

export const accountAdd: Route = {
  pathname: `${accountHome.pathname}/add`,
  titleTranslateKye: 'accountAdd',
}

export const accountDetail: Route = {
  pathname: `${accountHome.pathname}/[id]`,
  titleTranslateKye: 'accountDetail',
}

export const accountDetailEdit: Route = {
  pathname: `${accountDetail.pathname}/edit`,
  titleTranslateKye: 'accountDetailEdit',
}
