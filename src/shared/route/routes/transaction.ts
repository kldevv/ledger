import type { Route } from '../route'

export const transactionHome: Route = {
  pathname: '/transaction',
}

export const transactionAdd: Route = {
  pathname: `${transactionHome.pathname}/add`,
}

export const transactionDetail: Route = {
  pathname: `${transactionHome.pathname}/[id]`,
}

export const transactionDetailEdit: Route = {
  pathname: `${transactionDetail.pathname}/edit`,
}
