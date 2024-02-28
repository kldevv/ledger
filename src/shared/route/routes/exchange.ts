import type { Route } from '../route'

export const exchangeHome: Route = {
  pathname: '/exchange',
}

export const exchangeAdd: Route = {
  pathname: `${exchangeHome.pathname}/add`,
}

export const exchangeDetails: Route = {
  pathname: `${exchangeHome.pathname}/[id]`,
}

export const exchangeDetailsEdit: Route = {
  pathname: `${exchangeDetails.pathname}/edit`,
}
