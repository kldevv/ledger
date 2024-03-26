import type { Route } from '..'

const home: Route = {
  pathname: '/links',
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

export const link = {
  home,
  add,
  details,
  edit,
} as const
