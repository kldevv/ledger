import type { Route } from '..'

const home: Route = {
  pathname: '/account-group',
}

const add: Route = {
  pathname: `${home.pathname}/add`,
}

const details: Route = {
  pathname: `${home.pathname}/[id]`,
}

const edit: Route = {
  pathname: `${details.pathname}/edit`,
}

export const accountGroup = {
  home,
  add,
  details,
  edit,
} as const
