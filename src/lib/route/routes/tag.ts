import type { Route } from '../route'

export const tagHome: Route = {
  pathname: '/tag',
  titleTranslateKye: 'tagHome',
}

export const tagAdd: Route = {
  pathname: `${tagHome.pathname}/add`,
  titleTranslateKye: 'tagAdd',
}

export const tagDetail: Route = {
  pathname: `${tagHome.pathname}/[id]`,
  titleTranslateKye: 'tagDetail',
}

export const tagDetailEdit: Route = {
  pathname: `${tagDetail.pathname}/edit`,
  titleTranslateKye: 'tagDetailEdit',
}
