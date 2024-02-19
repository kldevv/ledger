import type { Route } from '../route'

export const tagHome: Route = {
  pathname: '/tag',
}

export const tagAdd: Route = {
  pathname: `${tagHome.pathname}/add`,
}

export const tagDetail: Route = {
  pathname: `${tagHome.pathname}/[id]`,
}

export const tagDetailEdit: Route = {
  pathname: `${tagDetail.pathname}/edit`,
}
