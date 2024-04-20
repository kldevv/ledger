import type { Route } from '..'

const home: Route = {
  pathname: '/',
}

const signIn: Route = {
  pathname: '/signin',
}

const about: Route = {
  pathname: '/about',
}

const user: Route = {
  pathname: '/user',
}

export const core = {
  home,
  signIn,
  about,
  user,
} as const
