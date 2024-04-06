import type { Route } from '..'

const home: Route = {
  pathname: '/journals',
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

export const journal = {
  home,
  add,
  details,
  edit,
} as const
