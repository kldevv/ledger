import type { Route } from '..'

const home: Route = {
  pathname: '/links',
}

const add: Route = {
  pathname: `${home.pathname}/add`,
}

export const link = {
  home,
  add,
} as const
