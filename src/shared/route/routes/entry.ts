import type { Route } from '..'

const home: Route = {
  pathname: '/entries',
}

const details: Route = {
  pathname: `${home.pathname}/[id]`,
}

export const entry = {
  home,
  details,
} as const
