import type { Route } from '../route'

export const transactionHome: Route = {
  pathname: '/transaction',
  titleTranslateKye: 'transactionHome',
}

export const transactionAdd: Route = {
  pathname: `${transactionHome.pathname}/add`,
  titleTranslateKye: 'transactionAdd',
}

export const transactionDetail: Route = {
  pathname: `${transactionHome.pathname}/[id]`,
  titleTranslateKye: 'transactionDetail',
}

export const transactionDetailEdit: Route = {
  pathname: `${transactionDetail.pathname}/edit`,
  titleTranslateKye: 'transactionDetailEdit',
}
