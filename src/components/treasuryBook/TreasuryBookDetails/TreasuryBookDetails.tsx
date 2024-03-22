import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { TreasuryBookDescriptionList } from '..'
import { useTreasuryBooksQuery } from '@/api/graphql'

export const TreasuryBookDetails: React.FC = () => {
  const router = useRouter()
  const { data } = useTreasuryBooksQuery({
    variables: {
      input: {
        ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  const { id } = router.query
  const treasuryBookId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const descriptionListData = useMemo(
    () => data?.treasuryBooks.find(({ id }) => id === treasuryBookId),
    [data?.treasuryBooks, treasuryBookId],
  )

  return (
    <div>
      <TreasuryBookDescriptionList data={descriptionListData} />
    </div>
  )
}
