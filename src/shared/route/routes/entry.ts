import type { Route } from '..'

const home: Route = {
  pathname: '/entry',
}

export const entry = {
  home,
} as const
