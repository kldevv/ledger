import type { Route } from '..'

const home: Route = {
  pathname: '/',
}

const about: Route = {
  pathname: '/about',
}

export const core = {
  home,
  about,
} as const
