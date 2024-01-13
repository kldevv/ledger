import type { Route } from '../route'

export const categoryHome: Route = {
  pathname: '/category',
  titleTranslateKye: 'categoryHome',
}

export const categoryAdd: Route = {
  pathname: `${categoryHome.pathname}/add`,
  titleTranslateKye: 'categoryAdd',
}

export const categoryDetail: Route = {
  pathname: `${categoryHome.pathname}/[id]`,
  titleTranslateKye: 'categoryDetail',
}

export const categoryDetailEdit: Route = {
  pathname: `${categoryDetail.pathname}/edit`,
  titleTranslateKye: 'categoryDetailEdit',
}
