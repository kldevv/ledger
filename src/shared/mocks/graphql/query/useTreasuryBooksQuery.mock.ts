import { graphql } from 'msw'

import {
  Currency,
  type TreasuryBooksQuery,
  type TreasuryBooksQueryVariables,
} from '@/api/graphql'

export const useTreasuryBooksQuery = graphql.query<
  TreasuryBooksQuery,
  TreasuryBooksQueryVariables
>('TreasuryBooks', (req, res, ctx) => {
  const { ownerId } = req.variables.input

  return res(
    ctx.data({
      treasuryBooks: [
        {
          ownerId,
          currency: Currency.USD,
          id: '1',
          name: 'Mock USD Treasury Book',
          updatedAt: new Date(0),
          createdAt: new Date(0),
        },
        {
          ownerId,
          currency: Currency.EUR,
          id: '2',
          name: 'Mock EUR Treasury Book',
          updatedAt: new Date(0),
          createdAt: new Date(0),
        },
        {
          ownerId,
          currency: Currency.NTD,
          id: '3',
          name: 'Mock NTD Treasury Book',
          updatedAt: new Date(0),
          createdAt: new Date(0),
        },
        {
          ownerId,
          currency: Currency.RMB,
          id: '4',
          name: 'Mock RMB Treasury Book',
          updatedAt: new Date(0),
          createdAt: new Date(0),
        },
      ],
    }),
  )
})
