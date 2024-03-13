import Link from 'next/link'

import { useTreasuryBookContext } from '@/hooks'
import { route } from '@/shared'

export interface TreasuryBookDetailLinkProps {
  /**
   * Treasury book id
   */
  treasuryBookId: string
}
export const TreasuryBookDetailLink: React.FC<TreasuryBookDetailLinkProps> = ({
  treasuryBookId,
}) => {
  const { data } = useTreasuryBookContext()

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
