import type { Route } from '..'

const home: Route = {
  pathname: '/entries',
}

export const entry = {
  home,
} as const
