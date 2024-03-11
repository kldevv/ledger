import type { Route } from '../route'

const home: Route = {
  pathname: '/journal',
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
