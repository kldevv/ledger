import type { Route } from '..'

const home: Route = {
  pathname: '/accounts',
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

export const account = {
  home,
  add,
  details,
  edit,
} as const
