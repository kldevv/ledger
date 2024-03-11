import type { Route } from '..'

const home: Route = {
  pathname: '/summary',
}

export const summary = {
  home,
} as const
