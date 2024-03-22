import Link from 'next/link'

import { route } from '@/shared'
import { useTreasuryBooksQuery } from '@/api/graphql'

export interface TreasuryBookDetailLinkProps {
  /**
   * Treasury book id
   */
  treasuryBookId: string
}
export const TreasuryBookDetailLink: React.FC<TreasuryBookDetailLinkProps> = ({
  treasuryBookId,
}) => {
  const { data } = useTreasuryBooksQuery({
    variables: {
      input: {
        ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  const name = data?.treasuryBooks.find(({ id }) => id === treasuryBookId)?.name

  return (
    <Link
      href={{
        pathname: route.branch.details.pathname,
        query: {
          id: treasuryBookId,
        },
      }}
      className="text-dark-shades hover:text-light-accent"
    >
      {name ?? treasuryBookId}
    </Link>
  )
}
