import type { Route } from '../route'

export const categoryHome: Route = {
  pathname: '/category',
}

export const categoryAdd: Route = {
  pathname: `${categoryHome.pathname}/add`,
}

export const categoryDetail: Route = {
  pathname: `${categoryHome.pathname}/[id]`,
}

export const categoryDetailEdit: Route = {
  pathname: `${categoryDetail.pathname}/edit`,
}
