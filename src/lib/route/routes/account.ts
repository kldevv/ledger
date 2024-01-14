import type { Route } from '../route'

export const accountHome: Route = {
  pathname: '/account',
}

export const accountAdd: Route = {
  pathname: `${accountHome.pathname}/add`,
}

export const accountDetail: Route = {
  pathname: `${accountHome.pathname}/[id]`,
}

export const accountDetailEdit: Route = {
  pathname: `${accountDetail.pathname}/edit`,
}
