import { useTreasuryBookContext } from '@/hooks'
import { route } from '@/lib'
import Link from 'next/link'

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

  const name = data?.getTreasuryBooks.find(({ id }) => id === treasuryBookId)
    ?.name

  return (
    <Link
      href={{
        pathname: route.treasuryBookDetail.pathname,
        query: {
          id: treasuryBookId,
        },
      }}
    >
      {name ?? treasuryBookId}
    </Link>
  )
}
