import type { Route } from '..'

const home: Route = {
  pathname: '/',
}

export const core = {
  home,
} as const
