import type { Route } from '..'

const home: Route = {
  pathname: '/xjournal',
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

export const xjournal = {
  home,
  add,
  details,
  edit,
} as const
